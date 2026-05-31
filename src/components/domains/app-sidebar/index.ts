import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { SITEMAP } from '../../../sitemap'

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
    this.querySelectorAll<HTMLElement>('.sidebar-menu a').forEach(a => {
      const href = a.getAttribute('href')?.replace('.html', '') || ''
      if (href && href === currentPageId) {
        a.setAttribute('aria-current', 'page')
      }
    })
  }

  private syncScrollPosition() {
    const saved = localStorage.getItem('sidebarScroll')
    if (saved) this.scrollTop = Number(saved)

    this.querySelectorAll<HTMLElement>('.sidebar-menu a').forEach(a => {
      a.addEventListener('click', () => {
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
              <mm-menu-item-link
                label="${node.title}"
                icon="${node.icon}"
                href="${node.id}.html"
                class="${currentPageId === node.id ? 'is-active' : ''}"
              ></mm-menu-item-link>
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
                  <mm-avatar slot="avatar" variant="tertiary" icon="${node.icon}"> </mm-avatar>
                  <mm-text size="14">${node.title}</mm-text>
                  <div style="margin-left: auto"><mm-icon name="nav-arrow-down"></mm-icon></div>
                </button>

                <menu id="${node.id}-menu" aria-labelledby="${node.id}-btn">
                  ${node?.items?.map(
                    item => html`
                      <a
                        href="${item.id}.html"
                        class="${currentPageId === item.id ? 'is-active' : ''}"
                      >
                        ${item.name} ${item.badge ? item.badge : ''}
                      </a>
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
