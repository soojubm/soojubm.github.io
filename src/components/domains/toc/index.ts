import { LitElement, css, html, nothing } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { ICON_NAMES } from '../../icon-button/semantics/icon-names'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'
import '../indicators/selection-indicator'
import '../../icon-button/icon-button'
import '../../button/button-group'

interface TocItem {
  id: string
  label: string
}

@customElement('mm-toc')
export class TableOfContents extends LitElement {
  @state() private items: TocItem[] = []
  @state() private activeId = ''
  @state() private copied = false
  @state() private indicatorY = 0

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
        color: var(--color-primary);
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

  connectedCallback() {
    super.connectedCallback()
    window.addEventListener('resize', this.updateIndicatorPosition)
    // 커스텀 엘리먼트 업그레이드 후 실행
    requestAnimationFrame(() => {
      this.buildItems()
      this.setupScrollSpy()
      this.updateIndicatorPosition()
    })
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    window.removeEventListener('resize', this.updateIndicatorPosition)
  }

  updated(changedProps: Map<string, unknown>) {
    if (changedProps.has('items') || changedProps.has('activeId')) {
      requestAnimationFrame(() => this.updateIndicatorPosition())
    }
  }

  private buildItems() {
    const items: TocItem[] = []

    const pageHeader = document.querySelector('mm-page-header')
    if (pageHeader) {
      const label = pageHeader.getAttribute('title') || ''
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
          const label = el.getAttribute('title') || ''
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
    if (!this.items.length) return

    const observer = new IntersectionObserver(
      entries => {
        // 가장 위에 있는 보이는 섹션을 active로
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible.length) {
          this.activeId = visible[0].target.id
        }
      },
      { rootMargin: '0px 0px -70% 0px' },
    )

    this.items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
  }

  private updateIndicatorPosition = () => {
    const list = this.renderRoot.querySelector<HTMLElement>('.toc-list')
    const indicator = this.renderRoot.querySelector<HTMLElement>('mm-selection-indicator')
    const activeItem = Array.from(this.renderRoot.querySelectorAll<HTMLElement>('.toc-link')).find(
      link => link.dataset.tocId === this.activeId,
    )

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
    try {
      await navigator.clipboard.writeText(this.shareUrl)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = this.shareUrl
      textarea.setAttribute('readonly', '')
      document.body.append(textarea)
      textarea.select()
      document.execCommand('copy')
      textarea.remove()
    }

    this.copied = true
    window.setTimeout(() => {
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
                variant="action"
                aria-label=${label}
                @click=${() => window.open(href, '_blank', 'noopener,noreferrer')}
              ></mm-icon-button>
            `,
          )}
          <mm-icon-button
            icon=${this.copied ? ICON_NAMES.COPY_SUCCESS : ICON_NAMES.LINK}
            variant="action"
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
