import { LitElement, css, html, nothing } from 'lit'
import { customElement, query, queryAll, state } from 'lit/decorators.js'
import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'
import { resetStyles } from '@/stylesheets/shared/reset.styles'
import { ScrollSpyController } from '@/controllers/scroll-spy-controller'
import { copyToClipboard } from '@/utils/clipboard'
import '@/components/domains/indicators/selection-indicator'
import '@/components/icon-button/icon-button'
import '@/components/button/button-group'

interface TocItem {
  id: string
  label: string
}

@customElement('mm-toc')
export class TableOfContents extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
        width: var(--width-small);
        max-height: calc(100vh - var(--size-huge));
        padding: var(--space-4) 0 0;
        flex-shrink: 0;
        position: sticky;
        top: calc(var(--space-4) * 4);
        overflow-y: auto;
      }

      .toc-title {
        margin: 0 0 var(--space-1) 0;
      }

      .toc-list {
        display: flex;
        flex-direction: column;
        gap: var(--space-05);
        position: relative;
      }

      .toc-link {
        display: block;
        width: 100%;
        padding: var(--space-05) var(--space-2);
        border: 0;
        border-radius: var(--radius);
        background: transparent;
        font-family: var(--font-family);
        font-size: var(--font-size-12);
        line-height: 1.5;
        color: var(--color-foreground-light);
        text-align: left;
        text-decoration: none;
        cursor: pointer;
        transition: color 0.16s ease;
      }

      .toc-link:hover {
        color: var(--color-foreground);
      }

      .toc-link[data-active] {
        color: var(--selection-foreground);
      }

      @media (prefers-reduced-motion: reduce) {
        .toc-link {
          transition: none;
        }
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
  @state() private copied = false
  @state() private indicatorY = 0

  private _setupFrame = 0
  private _indicatorFrame = 0
  private _copyTimer = 0
  private _scrollSpy = new ScrollSpyController(this, {
    onActiveChange: id => (this.activeId = id),
  })

  @query('.toc-list') private _list?: HTMLElement
  @query('mm-selection-indicator') private _indicator?: HTMLElement
  @queryAll('.toc-link') private _links!: NodeListOf<HTMLElement>

  connectedCallback() {
    super.connectedCallback()
    window.addEventListener('resize', this.updateIndicatorPosition)
    // 커스텀 엘리먼트 업그레이드 후 실행
    this._setupFrame = requestAnimationFrame(() => {
      this._setupFrame = 0
      this.buildItems()
      this.setupScrollSpy()
      this.updateIndicatorPosition()
    })
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.updateIndicatorPosition)
    if (this._setupFrame) cancelAnimationFrame(this._setupFrame)
    if (this._indicatorFrame) cancelAnimationFrame(this._indicatorFrame)
    if (this._copyTimer) window.clearTimeout(this._copyTimer)
    this._setupFrame = 0
    this._indicatorFrame = 0
    this._copyTimer = 0
    super.disconnectedCallback()
  }

  updated(changedProps: Map<string, unknown>) {
    if (changedProps.has('items') || changedProps.has('activeId')) {
      if (this._indicatorFrame) cancelAnimationFrame(this._indicatorFrame)
      this._indicatorFrame = requestAnimationFrame(() => {
        this._indicatorFrame = 0
        this.updateIndicatorPosition()
      })
    }
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

  private setupScrollSpy() {
    const targets = this.items
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    this._scrollSpy.observe(targets)
  }

  private updateIndicatorPosition = () => {
    const list = this._list
    const indicator = this._indicator
    const activeItem = Array.from(this._links).find(link => link.dataset.tocId === this.activeId)

    if (!list || !indicator || !activeItem) return

    const listRect = list.getBoundingClientRect()
    const itemRect = activeItem.getBoundingClientRect()
    const indicatorRect = indicator.getBoundingClientRect()
    const nextY = itemRect.top - listRect.top + itemRect.height / 2 - indicatorRect.height / 2

    if (this.indicatorY !== nextY) {
      this.indicatorY = nextY
    }
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

  private async copyShareUrl() {
    await copyToClipboard(this.shareUrl)

    this.copied = true
    if (this._copyTimer) window.clearTimeout(this._copyTimer)
    this._copyTimer = window.setTimeout(() => {
      this._copyTimer = 0
      this.copied = false
    }, 1600)
  }

  private renderShareSection() {
    return html`
      <section class="share" aria-label="Share on">
        <mm-text weight="bold" color="light" class="toc-title" aria-hidden="true">Share on</mm-text>
        <mm-button-group>
          ${this.shareLinks.map(
            ({ href, icon, label }) => html`
              <mm-icon-button
                icon=${icon}
                variant="tertiary"
                aria-label=${label}
                @click=${() => window.open(href, '_blank', 'noopener,noreferrer')}
              ></mm-icon-button>
            `,
          )}
          <mm-icon-button
            icon=${this.copied ? ICON_NAMES.COPY_SUCCESS : ICON_NAMES.LINK}
            variant="tertiary"
            aria-label=${this.copied ? 'Copied link' : 'Copy link'}
            @click=${this.copyShareUrl}
          ></mm-icon-button>
        </mm-button-group>
      </section>
    `
  }

  render() {
    if (!this.items.length) return nothing

    return html`
      <nav aria-label="On this page">
        <mm-text weight="bold" color="light" class="toc-title" aria-hidden="true">
          On this page
        </mm-text>
        <div class="toc-list" style=${`--selection-indicator-y: ${this.indicatorY}px`}>
          <mm-selection-indicator position="absolute" aria-hidden="true"></mm-selection-indicator>
          ${this.items.map(
            item => html`
              <button
                class="toc-link"
                type="button"
                data-toc-id=${item.id}
                ?data-active=${item.id === this.activeId}
                aria-current=${item.id === this.activeId ? 'true' : nothing}
                @click=${() => this.scrollToItem(item.id)}
              >
                ${item.label}
              </button>
            `,
          )}
        </div>
      </nav>
      ${this.renderShareSection()}
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-toc': TableOfContents
  }
}
