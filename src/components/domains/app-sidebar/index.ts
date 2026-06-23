import { LitElement, html, nothing } from 'lit'
import { customElement, queryAll, state } from 'lit/decorators.js'
import { SITEMAP } from '../../../sitemap'
import { ICON_NAMES } from '../../icon-button/semantics/icon-names'

@customElement('mm-sidebar')
export class Sidebar extends LitElement {
  @state() private _currentPageId = 'index'

  @queryAll('.sidebar-menu mm-menu-item-link') private _links!: NodeListOf<HTMLElement>

  // 💡 중요: 기존 전역 CSS(.sidebar-menu, .is-open 등)를 그대로 상속받아 쓰기 위해
  // Shadow DOM을 끄고 Light DOM 영역에 렌더링하도록 설정합니다.
  createRenderRoot() {
    return this
  }

  // Lit 렌더링이 완료된 후 실행 → DOM이 확실히 존재
  firstUpdated() {
    this.syncScrollPosition()
  }

  connectedCallback() {
    super.connectedCallback()
    const currentPath = window.location.pathname.split('/').pop() || 'index.html'
    this._currentPageId = currentPath.replace('.html', '') || 'index'
  }

  private syncScrollPosition() {
    const saved = localStorage.getItem('sidebarScroll')
    if (saved) this.scrollTop = Number(saved)

    this._links.forEach(link => {
      link.addEventListener('click', () => {
        localStorage.setItem('sidebarScroll', String(this.scrollTop))
      })
    })
  }

  private _handleStandaloneClick(pageId: string) {
    window.location.href = `${pageId}.html`
  }

  private _handleCategoryToggle(event: Event) {
    const trigger = event.currentTarget as HTMLElement
    const isOpen = trigger.classList.toggle('is-open')
    trigger.setAttribute('aria-expanded', String(isOpen))
  }

  private _isCurrentPage(pageId: string) {
    return this._currentPageId === pageId
  }

  render() {
    return html`
      <nav class="sidebar-menu">
        ${SITEMAP.map(node => {
          // 1. 독립형 메뉴 아이템 처리
          if (node.type === 'standalone') {
            return html`
              <mm-menu-item-action
                label="${node.title}"
                icon="${node.icon}"
                class=${this._isCurrentPage(node.id) ? 'is-active' : nothing}
                @click=${() => this._handleStandaloneClick(node.id)}
              ></mm-menu-item-action>
            `
          }

          // 2. 카테고리 그룹 메뉴 처리
          if (node.type === 'category') {
            return html`
              <div>
                <mm-menu-item-action
                  id="${node.id}-btn"
                  class="sidebar-category-trigger is-open"
                  label=${node.title}
                  icon=${node.icon}
                  trailing-icon=${ICON_NAMES.EXPAND}
                  aria-haspopup="menu"
                  aria-controls="${node.id}-menu"
                  aria-expanded="true"
                  @click=${this._handleCategoryToggle}
                ></mm-menu-item-action>

                <menu id="${node.id}-menu" aria-labelledby="${node.id}-btn">
                  ${node?.items
                    ?.filter(item => !('hidden' in item && item.hidden))
                    .map(
                      item => html`
                        <mm-menu-item-link
                          href="${item.id}.html"
                          label="${item.name}${item.badge ? ` ${item.badge}` : ''}"
                          target="_self"
                          hidden-trailing
                          aria-current=${this._isCurrentPage(item.id) ? 'page' : nothing}
                        ></mm-menu-item-link>
                      `,
                    )}
                </menu>
              </div>
            `
          }

          return ''
        })}
      </nav>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-sidebar': Sidebar
  }
}
