import { LitElement, html, nothing } from 'lit'
import { customElement } from 'lit/decorators.js'
import { SITEMAP } from '../../../sitemap'
import { ICON_NAMES } from '../../icon-button/semantics/icon-names'

@customElement('mm-sidebar')
export class Sidebar extends LitElement {
  // 💡 중요: 기존 전역 CSS(.sidebar-menu, .is-open 등)를 그대로 상속받아 쓰기 위해
  // Shadow DOM을 끄고 Light DOM 영역에 렌더링하도록 설정합니다.
  createRenderRoot() {
    return this
  }

  // Lit 렌더링이 완료된 후 실행 → DOM이 확실히 존재
  firstUpdated() {
    this.querySelectorAll<HTMLElement>('.sidebar-menu button').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.classList.toggle('is-open')
      })
    })

    this.highlightCurrentLink()
    this.syncScrollPosition()
  }

  private highlightCurrentLink() {
    const currentPageId = window.location.pathname.split('/').pop()?.replace('.html', '') || 'index'
    this.querySelectorAll<HTMLElement>('.sidebar-menu mm-menu-item-link').forEach(link => {
      const href = link.getAttribute('href')?.replace('.html', '') || ''
      if (href && href === currentPageId) {
        link.setAttribute('aria-current', 'page')
      }
    })
  }

  private syncScrollPosition() {
    const saved = localStorage.getItem('sidebarScroll')
    if (saved) this.scrollTop = Number(saved)

    this.querySelectorAll<HTMLElement>('.sidebar-menu mm-menu-item-link').forEach(link => {
      link.addEventListener('click', () => {
        localStorage.setItem('sidebarScroll', String(this.scrollTop))
      })
    })
  }

  render() {
    // 💡 브라우저 현재 URL을 분석해서 현재 어떤 페이지에 있는지 자동으로 알아냅니다.
    // 예: /thumbnail.html -> 'thumbnail'
    const currentPath = window.location.pathname.split('/').pop() || 'index.html'
    const currentPageId = currentPath.replace('.html', '') || 'index'

    return html`
      <nav class="sidebar-menu">
        ${SITEMAP.map(node => {
          // 1. 독립형 메뉴 아이템 처리
          if (node.type === 'standalone') {
            return html`
              <mm-menu-item-action
                label="${node.title}"
                icon="${node.icon}"
                class=${currentPageId === node.id ? 'is-active' : nothing}
                @click="${() => (window.location.href = `${node.id}.html`)}"
              ></mm-menu-item-action>
            `
          }

          // 2. 카테고리 그룹 메뉴 처리
          if (node.type === 'category') {
            return html`
              <div>
                <button
                  id="${node.id}-btn"
                  aria-haspopup="menu"
                  aria-controls="${node.id}-menu"
                  class="is-open"
                >
                  <mm-avatar slot="avatar" variant="tertiary" icon="${node.icon}"></mm-avatar>
                  <mm-paragraph>${node.title}</mm-paragraph>
                  <div style="margin-left: auto"><mm-icon name=${ICON_NAMES.EXPAND}></mm-icon></div>
                </button>

                <menu id="${node.id}-menu" aria-labelledby="${node.id}-btn">
                  ${node?.items?.map(
                    item => html`
                      <mm-menu-item-link
                        href="${item.id}.html"
                        label="${item.name}${item.badge ? ` ${item.badge}` : ''}"
                        target="_self"
                        hide-trailing
                        aria-current=${currentPageId === item.id ? 'page' : nothing}
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
