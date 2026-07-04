import { LitElement, html, nothing } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { repeat } from 'lit/directives/repeat.js'

import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'
import { SITEMAP } from '@/sitemap'

@customElement('mm-sidebar')
export class Sidebar extends LitElement {
  @state() private currentPageId = 'index'
  @state() private openGroupIds = new Set(
    SITEMAP.filter(node => node.type === 'group').map(node => node.id),
  )

  render() {
    return html`
      <nav class="sidebar-menu">
        ${repeat(
          SITEMAP,
          node => node.id,
          node => {
            if (node.type === 'standalone') {
              return html`
                <mm-menu-item-action
                  label=${node.title}
                  icon=${node.icon}
                  aria-current=${ifDefined(this.isCurrentPage(node.id) ? 'page' : undefined)}
                  @click=${() => this.handleStandaloneClick(node.id)}
                ></mm-menu-item-action>
              `
            }

            if (node.type === 'group') {
              const isOpen = this.openGroupIds.has(node.id)

              return html`
                <div>
                  <mm-menu-item-action
                    id="${node.id}-btn"
                    class="sidebar-category-trigger"
                    label=${node.title}
                    icon=${node.icon}
                    trailing-icon=${ICON_NAMES.EXPAND}
                    aria-haspopup="menu"
                    aria-controls="${node.id}-menu"
                    aria-expanded=${isOpen ? 'true' : 'false'}
                    @click=${() => this.handleGroupToggle(node.id)}
                  ></mm-menu-item-action>

                  <menu id="${node.id}-menu" aria-labelledby="${node.id}-btn">
                    ${repeat(
                      node.items.filter(item => !('hidden' in item && item.hidden)),
                      item => item.id,
                      item => html`
                        <mm-menu-item-link
                          href="${item.id}.html"
                          label="${item.name}${item.badge ? ` ${item.badge}` : ''}"
                          target="_self"
                          hidden-trailing
                          aria-current=${ifDefined(
                            this.isCurrentPage(item.id) ? 'page' : undefined,
                          )}
                          @click=${this.saveScrollPosition}
                        ></mm-menu-item-link>
                      `,
                    )}
                  </menu>
                </div>
              `
            }

            return nothing
          },
        )}
      </nav>
    `
  }

  // 💡 중요: 기존 전역 CSS(.sidebar-menu 등)를 그대로 상속받아 쓰기 위해
  // Shadow DOM을 끄고 Light DOM 영역에 렌더링하도록 설정합니다.
  createRenderRoot() {
    return this
  }

  firstUpdated() {
    this.restoreScrollPosition()
  }

  connectedCallback() {
    super.connectedCallback()
    const currentPath = window.location.pathname.split('/').pop() || 'index.html'
    this.currentPageId = currentPath.replace('.html', '') || 'index'
    // 닫힌 사이드바로 포커스가 들어가지 않도록 열림 상태에 맞춰 초기 inert를 맞춘다.
    // 이후 열고 닫는 토글은 navbar.ts의 syncNavbarMenu가 관리한다.
    this.inert = !document.body.classList.contains('is-menu-opened')
  }

  private restoreScrollPosition() {
    const saved = localStorage.getItem('sidebarScroll')
    if (saved) this.scrollTop = Number(saved)
  }

  private handleStandaloneClick(pageId: string) {
    this.saveScrollPosition()
    window.location.href = `${pageId}.html`
  }

  private handleGroupToggle(groupId: string) {
    const nextOpenGroupIds = new Set(this.openGroupIds)

    if (nextOpenGroupIds.has(groupId)) nextOpenGroupIds.delete(groupId)
    else nextOpenGroupIds.add(groupId)

    this.openGroupIds = nextOpenGroupIds
  }

  private saveScrollPosition() {
    localStorage.setItem('sidebarScroll', String(this.scrollTop))
  }

  private isCurrentPage(pageId: string) {
    return this.currentPageId === pageId
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-sidebar': Sidebar
  }
}
