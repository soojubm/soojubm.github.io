import { LitElement, html } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { repeat } from 'lit/directives/repeat.js'

import type { Scroll } from '@/components/common/scroll/scroll'
import type { SitemapItem, SitemapNode } from '@/sitemap'

import '@/components/common'
import '@/components/layouts/app-sidebar/sidebar-page-link'
import '@/components/layouts/app-sidebar/sidebar-section'
import '@/components/layouts/app-sidebar/sidebar-user-menu'
import { sidebarStyles } from '@/components/layouts/app-sidebar/sidebar.styles'
import { MEDIA_QUERY } from '@/constants'
import { DisclosureController } from '@/controllers/disclosure-controller'
import { SITEMAP } from '@/sitemap'
import { getCurrentPageId } from '@/utils'

type SidebarSection = Extract<SitemapNode, { type: 'standalone' }>
type SidebarGroup = Extract<SitemapNode, { type: 'group' }>

const standaloneNodes = SITEMAP.filter((node): node is SidebarSection => node.type === 'standalone')
const groupNodes = SITEMAP.filter((node): node is SidebarGroup => node.type === 'group')

const hasChildren = (node: SidebarSection) => !!node.children?.length

@customElement('mm-sidebar')
export class Sidebar extends LitElement {
  static styles = [sidebarStyles]
  @property({ type: Boolean, reflect: true }) open = false
  @query('mm-scroll') private scrollEl?: Scroll
  private currentPageId = getCurrentPageId()
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
      <nav>
        <mm-scroll direction="column" gap="4">
          <mm-list-item-group size="small">
            ${repeat(standaloneNodes, node => node.id, this.renderStandalone)}
          </mm-list-item-group>
          ${repeat(groupNodes, node => node.id, this.renderGroup)}
        </mm-scroll>
        <mm-sidebar-user-menu
          name="soojubm"
          description="soojubm.github.io"
          avatar-src="/src/images/soojubm.png"
        ></mm-sidebar-user-menu>
      </nav>
    `
  }

  private renderStandalone = (node: SidebarSection) => {
    if (hasChildren(node)) return this.renderSection(node)

    return html`
      <mm-sidebar-page-link
        href="${node.id}.html"
        label=${node.title}
        icon=${node.icon}
        @click=${this.handlePageLinkClick}
      ></mm-sidebar-page-link>
    `
  }
  private renderSection = (node: SidebarSection) => html`
    <mm-sidebar-section
      label=${node.title}
      icon=${node.icon}
      ?open=${this.containsCurrentPage(node)}
    >
      ${repeat(node.children ?? [], item => item.id, this.renderItemLink)}
    </mm-sidebar-section>
  `
  private renderGroup = (node: SidebarGroup) => {
    const headingId = `sidebar-group-${node.id}`

    return html`
      <div class="group">
        <mm-heading level="5" id=${headingId}>${node.title}</mm-heading>
        <mm-list-item-group size="small" aria-labelledby=${headingId}>
          ${repeat(node.items, item => item.id, this.renderItemLink)}
        </mm-list-item-group>
      </div>
    `
  }
  private renderItemLink = (item: SitemapItem) => html`
    <mm-sidebar-page-link
      emoji="#"
      href="${item.id}.html"
      label=${item.name}
      @click=${this.handlePageLinkClick}
    ></mm-sidebar-page-link>
  `

  firstUpdated() {
    this.restoreScrollPosition()
  }

  connectedCallback() {
    super.connectedCallback()

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
    if (saved && this.scrollEl) this.scrollEl.scrollTop = Number(saved)
  }

  private handlePageLinkClick() {
    this.saveScrollPosition()
  }

  private saveScrollPosition() {
    localStorage.setItem('sidebarScroll', String(this.scrollEl?.scrollTop ?? 0))
  }

  private containsCurrentPage(node: SidebarSection) {
    if (node.id === this.currentPageId) return true

    return (node.children ?? []).some(item => item.id === this.currentPageId)
  }
}
