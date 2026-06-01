import { LitElement, css, html, nothing } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'

interface TocItem {
  id: string
  label: string
  level: 'page' | 'guide' | 'section'
}

@customElement('mm-toc')
export class TableOfContents extends LitElement {
  @state() private items: TocItem[] = []
  @state() private activeId = ''

  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
        width: 200px;
        flex-shrink: 0;
        position: sticky;
        top: 4rem;
        max-height: calc(100vh - 5rem);
        overflow-y: auto;
        padding: var(--space-4) 0 var(--space-4) var(--space-4);
        box-sizing: border-box;
      }

      .toc-title {
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin: 0 0 var(--space-2) 0;
      }

      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      a {
        display: block;
        font-size: var(--font-size-12);
        line-height: 1.5;
        color: var(--color-foreground-light);
        text-decoration: none;
        padding: 2px var(--space-2);
        border-radius: var(--radius);
        border-left: 2px solid transparent;
        transition: color 0.1s, border-color 0.1s;
      }

      a:hover {
        color: var(--color-foreground);
      }

      li[data-level='page'] a {
        font-weight: var(--font-weight-bold);
        color: var(--color-foreground);
      }

      li[data-level='guide'] a {
        color: var(--color-foreground);
        padding-left: var(--space-2);
      }

      li[data-level='section'] a {
        padding-left: var(--space-5);
      }

      li[data-active] a {
        color: var(--color-primary);
        border-left-color: var(--color-primary);
      }
    `,
  ]

  connectedCallback() {
    super.connectedCallback()
    // 커스텀 엘리먼트 업그레이드 후 실행
    requestAnimationFrame(() => {
      this.buildItems()
      this.setupScrollSpy()
    })
  }

  private buildItems() {
    const items: TocItem[] = []

    const pageHeader = document.querySelector('mm-page-header')
    if (pageHeader) {
      const label = pageHeader.getAttribute('title') || ''
      if (label) {
        pageHeader.id = 'toc-page-header'
        items.push({ id: 'toc-page-header', label, level: 'page' })
      }
    }

    // mm-component-guide 내의 mm-component-section을 순서대로 수집
    let guideIndex = 0
    let sectionIndex = 0

    document.querySelectorAll<HTMLElement>('mm-component-guide, mm-component-section').forEach(el => {
      if (el.tagName.toLowerCase() === 'mm-component-guide') {
        const id = `toc-guide-${guideIndex++}`
        el.id = id
        items.push({ id, label: 'Component Guide', level: 'guide' })
      } else {
        const label = el.getAttribute('title') || ''
        if (!label) return
        const id = `toc-section-${sectionIndex++}`
        el.id = id
        items.push({ id, label, level: 'section' })
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

  render() {
    if (!this.items.length) return nothing

    return html`
      <nav aria-label="On this page">
        <mm-text size="12" weight="bold" color="var(--color-foreground-light)" class="toc-title" aria-hidden="true">On this page</mm-text>
        <ul>
          ${this.items.map(
            item => html`
              <li data-level=${item.level} ?data-active=${item.id === this.activeId}>
                <a href=${'#' + item.id}>${item.label}</a>
              </li>
            `,
          )}
        </ul>
      </nav>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-toc': TableOfContents
  }
}
