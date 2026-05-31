import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import '../icon-button/prev-button'
import '../icon-button/next-button'

type PaginationItem = number | 'ellipsis'

@customElement('mm-pagination')
export class Pagination extends LitElement {
  @property({ type: Number, attribute: 'current-page', reflect: true }) currentPage = 1
  @property({ type: Number, attribute: 'page-count' }) pageCount = 1
  @property({ type: Number, attribute: 'sibling-count' }) siblingCount = 1
  @property({ type: String }) label = 'pagination'

  static styles = css`
    :host {
      display: block;
    }

    .pagination {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-1);
      margin: var(--space-4) 0;
    }

    button,
    .pagination-ellipsis {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--size-medium);
      height: var(--size-medium);
      border-radius: var(--radius);
      font: inherit;
      line-height: 1;
    }

    button {
      border: var(--border);
      background: var(--color-background);
      color: var(--color-foreground);
      cursor: pointer;
    }

    button:not(:disabled):hover {
      border-color: var(--color-background-strong);
      background: var(--color-background-subtle);
    }

    button:not(:disabled):focus {
      outline: 3px solid #007185;
      outline-offset: 2px;
    }

    button[aria-current='page'] {
      border-color: var(--selection-indicator-color);
      background-color: var(--selection-background);
      color: var(--selection-foreground);
      font-weight: var(--font-weight-bold);
    }

    button:disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }

    .pagination-ellipsis {
      color: var(--color-foreground-light);
      letter-spacing: 1px;
      user-select: none;
    }

    @media (max-width: 480px) {
      .pagination {
        gap: 0;
      }

      button,
      .pagination-ellipsis,
      mm-prev-button,
      mm-next-button {
        width: var(--size-small);
        height: var(--size-small);
      }
    }
  `

  private get safePageCount() {
    return Math.max(1, Math.floor(this.pageCount))
  }

  private get safeCurrentPage() {
    return Math.min(Math.max(1, Math.floor(this.currentPage)), this.safePageCount)
  }

  private get pages(): PaginationItem[] {
    const pageCount = this.safePageCount
    const currentPage = this.safeCurrentPage
    const siblingCount = Math.max(0, Math.floor(this.siblingCount))
    const totalNumbers = siblingCount * 2 + 5

    if (pageCount <= totalNumbers) {
      return Array.from({ length: pageCount }, (_, index) => index + 1)
    }

    const leftSibling = Math.max(currentPage - siblingCount, 1)
    const rightSibling = Math.min(currentPage + siblingCount, pageCount)
    const showLeftEllipsis = leftSibling > 2
    const showRightEllipsis = rightSibling < pageCount - 1

    if (!showLeftEllipsis && showRightEllipsis) {
      const leftRange = Array.from({ length: totalNumbers - 2 }, (_, index) => index + 1)
      return [...leftRange, 'ellipsis', pageCount]
    }

    if (showLeftEllipsis && !showRightEllipsis) {
      const start = pageCount - (totalNumbers - 3)
      const rightRange = Array.from({ length: totalNumbers - 2 }, (_, index) => start + index)
      return [1, 'ellipsis', ...rightRange]
    }

    const middleRange = Array.from(
      { length: rightSibling - leftSibling + 1 },
      (_, index) => leftSibling + index,
    )
    return [1, 'ellipsis', ...middleRange, 'ellipsis', pageCount]
  }

  private setPage(page: number) {
    const nextPage = Math.min(Math.max(1, page), this.safePageCount)
    if (nextPage === this.safeCurrentPage) return

    this.currentPage = nextPage
    this.dispatchEvent(
      new CustomEvent('page-change', {
        detail: { page: nextPage },
        bubbles: true,
        composed: true,
      }),
    )
  }

  private renderPage(item: PaginationItem) {
    if (item === 'ellipsis') {
      return html`<span class="pagination-ellipsis" aria-hidden="true">...</span>`
    }

    const isCurrent = item === this.safeCurrentPage

    return html`
      <button
        type="button"
        aria-label=${`${item} 페이지로 이동`}
        aria-current=${isCurrent ? 'page' : nothing}
        @click=${() => this.setPage(item)}
      >
        ${item}
      </button>
    `
  }

  render() {
    const currentPage = this.safeCurrentPage

    return html`
      <nav class="pagination" aria-label=${this.label}>
        <mm-prev-button
          aria-label="이전 페이지로 이동"
          ?disabled=${currentPage === 1}
          @click=${() => this.setPage(currentPage - 1)}
        ></mm-prev-button>
        ${this.pages.map(item => this.renderPage(item))}
        <mm-next-button
          aria-label="다음 페이지로 이동"
          ?disabled=${currentPage === this.safePageCount}
          @click=${() => this.setPage(currentPage + 1)}
        ></mm-next-button>
      </nav>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-pagination': Pagination
  }
}
