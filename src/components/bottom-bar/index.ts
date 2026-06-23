import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { ICON_NAMES, type IconName } from '../icon-button/semantics/icon-names'
import '../text/semantics/caption'

interface BottomBarItem {
  label: string
  href?: string
  icon?: IconName
  active?: boolean
  // badge?: boolean
}

const defaultItems: BottomBarItem[] = [
  { label: '홈', href: '#', icon: ICON_NAMES.HOME, active: true },
  { label: '카테고리', href: '#', icon: ICON_NAMES.HOME },
  { label: '설정', href: '#', icon: ICON_NAMES.HOME },
]

@customElement('mm-bottom-bar')
class BottomBar extends LitElement {
  @property({ type: String }) items = ''
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = '하단 내비게이션'

  @state() private selectedIndex: number | null = null

  static styles = css`
    :host {
      --bottom-bar-item-height: calc(var(--size-medium) + var(--font-line-height-24));
    }

    .bottom-bar {
      display: flex;
      padding: var(--space-2) 0 calc(env(safe-area-inset-bottom) + var(--space-2));
      background: var(--color-background);
      position: relative;
    }

    .bottom-bar-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      min-width: var(--size-large);
      height: var(--bottom-bar-item-height);
      color: var(--color-foreground);
      text-decoration: none;
      position: relative;
      z-index: 1;
    }

    .bottom-bar-item[aria-current='page'] {
      color: var(--selection-foreground);
    }

    .bottom-bar-item[aria-current='page'] mm-avatar {
      --avatar-icon-color: var(--selection-foreground);
    }

    .bottom-bar-item[aria-current='page'] mm-caption {
      --color-foreground-light: var(--selection-foreground);
    }

    .bottom-bar-indicator {
      width: calc(100% / var(--bottom-bar-count, 3));
      height: var(--bottom-bar-item-height);
      border-radius: var(--radius-large);
      background: var(--selection-background);
      position: absolute;
      top: var(--space-2);
      left: 0;
      transform: var(--bottom-bar-transform, translateX(0%));
      transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      pointer-events: none;
    }
  `

  private handleItemClick(e: Event, index: number) {
    e.preventDefault()
    this.selectedIndex = index
    this.dispatchEvent(
      new CustomEvent('change', { detail: { index }, bubbles: true, composed: true }),
    )
  }

  private get parsedItems() {
    if (!this.items) return defaultItems

    try {
      const parsed = JSON.parse(this.items)
      return Array.isArray(parsed) ? parsed : defaultItems
    } catch {
      return defaultItems
    }
  }

  render() {
    const items = this.parsedItems
    const defaultActive = items.findIndex(item => item.active)
    const activeIndex = this.selectedIndex ?? (defaultActive >= 0 ? defaultActive : null)

    return html`
      <nav
        class="bottom-bar"
        aria-label=${this.ariaLabel}
        style="--bottom-bar-count: ${items.length}"
      >
        <span
          class="bottom-bar-indicator"
          aria-hidden="true"
          style="--bottom-bar-transform: translateX(${(activeIndex ?? 0) * 100}%)"
        ></span>
        ${items.map(
          (item, index) => html`
            <a
              class="bottom-bar-item"
              href=${item.href ?? '#'}
              aria-current=${activeIndex === index ? 'page' : nothing}
              @click=${(e: Event) => this.handleItemClick(e, index)}
            >
              <mm-avatar variant="tertiary" icon=${item.icon ?? ICON_NAMES.HOME}></mm-avatar>
              <mm-caption>${item.label}</mm-caption>
            </a>
          `,
        )}
      </nav>
    `
  }
}

export default BottomBar

declare global {
  interface HTMLElementTagNameMap {
    'mm-bottom-bar': BottomBar
  }
}
