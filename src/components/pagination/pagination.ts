import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import '../icon-button/semantics/prev-button'
import '../icon-button/semantics/next-button'
import '../icon-button/semantics/page-button'
import { paginationStyles } from './pagination.styles'

type PaginationItem = number | 'ellipsis'

@customElement('mm-pagination')
export class Pagination extends LitElement {
  @property({ type: Number, attribute: 'current-page' }) currentPage = 1
  @property({ type: Number, attribute: 'page-count' }) pageCount = 1
  @property({ type: Number, attribute: 'sibling-count' }) siblingCount = 1
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = 'pagination'

  static styles = paginationStyles

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
      return html`
        <span class="pagination-ellipsis" aria-hidden="true">...</span>
      `
    }

    const isCurrent = item === this.safeCurrentPage

    return html`
      <mm-page-button
        .page=${item}
        aria-current=${isCurrent ? 'page' : nothing}
        @click=${() => this.setPage(item)}
      ></mm-page-button>
    `
  }

  render() {
    const currentPage = this.safeCurrentPage

    return html`
      <nav class="pagination" aria-label=${this.ariaLabel}>
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
