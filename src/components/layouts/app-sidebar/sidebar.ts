import { LitElement, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { repeat } from 'lit/directives/repeat.js'

import '@/components/common/tag/tag'
import { ICON_NAMES } from '@/components/common/icon-button/semantics/icon-names'
import { sidebarStyles } from '@/components/layouts/app-sidebar/sidebar.styles'
import { MEDIA_QUERY } from '@/constants'
import { DisclosureController } from '@/controllers/disclosure-controller'
import { SITEMAP, type SitemapNode } from '@/sitemap'
import { resetStyles } from '@/stylesheets/shared.styles'
import { getCurrentPageId } from '@/utils/current-page'

@customElement('mm-sidebar')
export class Sidebar extends LitElement {
  static styles = [resetStyles, sidebarStyles]

  @property({ type: Boolean, reflect: true }) open = false

  @state() private currentPageId = 'index'
  @state() private openGroupIds = new Set(
    SITEMAP.filter(node => node.type === 'group').map(node => node.id),
  )

  private mobileQuery = window.matchMedia(MEDIA_QUERY.default)

  private disclosure = new DisclosureController(this, {
    isOpen: () => this.open,
    setOpen: open => {
      this.open = open
    },
    dismissOn: ['escape'],
  })

  render() {
    return html`
      <nav>${repeat(SITEMAP, node => node.id, this.renderNode)}</nav>
    `
  }

  private renderNode = (node: SitemapNode) => {
    if (node.type === 'standalone') return this.renderStandalone(node)
    if (node.type === 'group') return this.renderGroup(node)

    return nothing
  }

  private renderStandalone(node: Extract<SitemapNode, { type: 'standalone' }>) {
    if (node.hidden) return nothing

    return html`
      <mm-menu-item-action
        label=${node.title}
        icon=${node.icon}
        aria-current=${ifDefined(this.isCurrentPage(node.id) ? 'page' : undefined)}
        @click=${() => this.handleStandaloneClick(node.id)}
      >
        ${node.badge
          ? html`
              <mm-tag slot="trailing">${node.badge}</mm-tag>
            `
          : nothing}
      </mm-menu-item-action>
    `
  }

  private renderGroup(node: Extract<SitemapNode, { type: 'group' }>) {
    const isOpen = this.openGroupIds.has(node.id)

    return html`
      <mm-list-item
        id="${node.id}-btn"
        label=${node.title}
        icon=${node.icon}
        trailing-icon=${ICON_NAMES.EXPAND}
        aria-haspopup="menu"
        aria-controls="${node.id}-menu"
        aria-expanded=${isOpen ? 'true' : 'false'}
        @click=${() => this.handleGroupToggle(node.id)}
      ></mm-list-item>

      <menu id="${node.id}-menu" aria-labelledby="${node.id}-btn">
        ${repeat(
          node.items.filter(item => !('hidden' in item && item.hidden)),
          item => item.id,
          item => html`
            <mm-menu-item-link
              emoji="#"
              href="${item.id}.html"
              label="${item.name}"
              badge=${ifDefined(item.badge || undefined)}
              target="_self"
              hidden-trailing
              aria-current=${ifDefined(this.isCurrentPage(item.id) ? 'page' : undefined)}
              @click=${this.handleMenuItemClick}
            ></mm-menu-item-link>
          `,
        )}
      </menu>
    `
  }

  firstUpdated() {
    this.restoreScrollPosition()
  }

  connectedCallback() {
    super.connectedCallback()
    this.currentPageId = getCurrentPageId()

    if (this.mobileQuery.matches) this.open = false
    this.mobileQuery.addEventListener('change', this.handleMobileChange)
  }

  disconnectedCallback() {
    this.mobileQuery.removeEventListener('change', this.handleMobileChange)
    super.disconnectedCallback()
  }

  protected updated(changedProperties: Map<string, unknown>) {
    // 닫힌 사이드바로 포커스가 들어가지 않도록 열림 상태에 맞춰 inert를 맞춘다.
    if (changedProperties.has('open')) this.inert = !this.open
  }

  close() {
    this.open = false
  }

  private handleMobileChange = (e: MediaQueryListEvent) => {
    if (e.matches) this.close()
  }

  private restoreScrollPosition() {
    const saved = localStorage.getItem('sidebarScroll')
    if (saved) this.scrollTop = Number(saved)
  }

  private handleStandaloneClick(pageId: string) {
    this.saveScrollPosition()
    this.navigate(pageId)
  }

  private navigate(pageId: string) {
    window.location.href = `${pageId}.html`
  }

  private handleGroupToggle(groupId: string) {
    const nextOpenGroupIds = new Set(this.openGroupIds)

    if (nextOpenGroupIds.has(groupId)) nextOpenGroupIds.delete(groupId)
    else nextOpenGroupIds.add(groupId)

    this.openGroupIds = nextOpenGroupIds
  }

  private handleMenuItemClick() {
    this.saveScrollPosition()
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
