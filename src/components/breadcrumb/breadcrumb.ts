import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

interface BreadcrumbItem {
  label: string
  href?: string
}

/**
 * 현재 위치를 계층 구조로 보여주는 내비게이션.
 * items를 JSON 문자열로 받아 링크/현재 페이지·구분자를 렌더한다.
 * 마지막 항목은 현재 페이지(aria-current="page")로 처리한다.
 */
@customElement('mm-breadcrumb')
export class Breadcrumb extends LitElement {
  @property({ type: String }) items = '[]'
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = 'breadcrumb'
  @property({ type: String }) divider = '/'

  static styles = css`
    :host {
      display: block;

      --breadcrumb-item-color: var(--color-primary);
      --breadcrumb-item-color-current: var(--color-foreground);
      --breadcrumb-divider-color: var(--color-border);
      --breadcrumb-divider-space: var(--space-3);
    }

    .breadcrumb {
      display: flex;
      align-items: center;
      width: 100%;
      overflow: hidden;
    }

    .breadcrumb-divider {
      margin: 0 var(--breadcrumb-divider-space);
      color: var(--breadcrumb-divider-color);
      font-style: normal;
    }

    .breadcrumb-item {
      color: var(--breadcrumb-item-color);
      text-decoration: none;
      white-space: nowrap;

      &[aria-current='page'] {
        color: var(--breadcrumb-item-color-current);
      }
    }
  `

  private get parsedItems(): BreadcrumbItem[] {
    try {
      const parsed = JSON.parse(this.items)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }

  render() {
    const items = this.parsedItems

    return html`
      <nav class="breadcrumb" aria-label=${this.ariaLabel}>
        ${items.map((item, index) => {
          const isLast = index === items.length - 1
          const isHome = index === 0

          const node =
            item.href && !isLast
              ? html`
                  <a class="breadcrumb-item ${isHome ? 'breadcrumb-home' : ''}" href=${item.href}>
                    ${item.label}
                  </a>
                `
              : html`
                  <span class="breadcrumb-item" aria-current=${isLast ? 'page' : nothing}>
                    ${item.label}
                  </span>
                `

          return html`
            ${node}${isLast
              ? nothing
              : html`
                  <i class="breadcrumb-divider" aria-hidden="true">${this.divider}</i>
                `}
          `
        })}
      </nav>
    `
  }
}

export default Breadcrumb
