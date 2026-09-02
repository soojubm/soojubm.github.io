import { LitElement, css, html, nothing } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import { ICON_NAMES, type IconName } from '@/components/common/icon-button/semantics/icon-names'
import { ScrollSpyController } from '@/controllers/scroll-spy-controller'
import { resetStyles } from '@/stylesheets/shared.styles'
import '@/components/common/icon-button/icon-button'
import '@/components/common/button/button'
import '@/components/common/button/button-group'
import '@/components/common/text/text'

interface TocItem {
  id: string
  label: string
}

interface ShareLink {
  href: string
  icon: IconName
  label: string
}

@customElement('mm-toc')
export class TableOfContents extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
        position: sticky;
      }
      .share {
        display: flex;
        flex-direction: column;
        gap: var(--space-1);
        margin-top: var(--space-4);
      }
    `,
  ]

  @state() private items: TocItem[] = []
  @state() private activeId = ''

  private setupFrame = 0
  private scrollSpy = new ScrollSpyController(this, {
    getTargets: () => this.resolveScrollSpyTargets(),
    onActiveChange: id => (this.activeId = id),
  })

  render() {
    if (!this.items.length) return nothing

    return html`
      <nav aria-label="On this page">
        <mm-text weight="bold" color="light" aria-hidden="true">On this page</mm-text>
        <mm-button-group>${this.renderTocItems()}</mm-button-group>
      </nav>
      ${this.renderShareSection()}
    `
  }

  private renderTocItems() {
    return this.items.map(item => this.renderTocItem(item))
  }

  private renderTocItem(item: TocItem) {
    return html`
      <mm-button
        size="small"
        aria-current=${ifDefined(item.id === this.activeId ? 'true' : undefined)}
        @click=${() => this.scrollToItem(item.id)}
      >
        ${item.label}
      </mm-button>
    `
  }

  connectedCallback() {
    super.connectedCallback()
    this.setupFrame = requestAnimationFrame(() => {
      this.setupFrame = 0
      this.buildItems()
    })
  }

  disconnectedCallback() {
    if (this.setupFrame) cancelAnimationFrame(this.setupFrame)
    this.setupFrame = 0
    super.disconnectedCallback()
  }

  private buildItems() {
    const items: TocItem[] = []

    const pageHeader = document.querySelector('mm-page-header')
    if (pageHeader) {
      const label = pageHeader.getAttribute('heading') || ''
      if (label) {
        pageHeader.id = 'toc-page-header'
        items.push({ id: 'toc-page-header', label })
      }
    }

    // mm-component-guide 내의 mm-component-section을 순서대로 수집
    let guideIndex = 0
    let sectionIndex = 0

    document
      .querySelectorAll<HTMLElement>('mm-component-guide, mm-component-section')
      .forEach(el => {
        if (el.tagName.toLowerCase() === 'mm-component-guide') {
          const id = `toc-guide-${guideIndex++}`
          el.id = id
          items.push({ id, label: 'Component Guide' })
        } else {
          const label = el.getAttribute('heading') || ''
          if (!label) return
          const id = `toc-section-${sectionIndex++}`
          el.id = id
          items.push({ id, label })
        }
      })

    this.items = items
    if (items.length) this.activeId = items[0].id
  }

  private resolveScrollSpyTargets() {
    return this.items
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
  }

  private scrollToItem(id: string) {
    const target = document.getElementById(id)
    if (!target) return

    this.activeId = id
    target.scrollIntoView({ block: 'start', behavior: 'smooth' })
    window.history.pushState(null, '', `#${id}`)
  }

  private get shareUrl() {
    return window.location.href
  }

  private get shareTitle() {
    return document.title
  }

  private get shareLinks() {
    const url = encodeURIComponent(this.shareUrl)
    const title = encodeURIComponent(this.shareTitle)

    return [
      {
        href: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
        icon: ICON_NAMES.TWITTER,
        label: 'Share on Twitter',
      },
      {
        href: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        icon: ICON_NAMES.FACEBOOK,
        label: 'Share on Facebook',
      },
    ]
  }

  private renderShareSection() {
    return html`
      <section class="share" aria-label="Share on">
        <mm-text weight="bold" color="light" aria-hidden="true">Share on</mm-text>
        <mm-button-group>${this.renderShareLinks()}</mm-button-group>
      </section>
    `
  }

  private renderShareLinks() {
    return this.shareLinks.map(link => this.renderShareLink(link))
  }

  private renderShareLink({ href, icon, label }: ShareLink) {
    return html`
      <mm-icon-button
        icon=${icon}
        variant="tertiary"
        aria-label=${label}
        @click=${() => window.open(href, '_blank', 'noopener,noreferrer')}
      ></mm-icon-button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-toc': TableOfContents
  }
}
