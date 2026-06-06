import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ICON_NAMES } from '../icon-button/semantics/icon-names'

interface BottomBarItem {
  label: string
  href?: string
  icon?: string
  active?: boolean
  badge?: boolean
}

const defaultItems: BottomBarItem[] = [
  { label: '홈', href: '#', icon: ICON_NAMES.HOME, active: true, badge: true },
  { label: '카테고리', href: '#', icon: ICON_NAMES.HOME },
  { label: '설정', href: '#', icon: ICON_NAMES.HOME },
]

@customElement('mm-bottom-bar')
class BottomBar extends LitElement {
  @property({ type: String }) items = ''
  @property({ type: String }) label = '하단 내비게이션'

  static styles = css`
    .bottom-bar {
      display: flex;
      justify-content: space-around;
      padding: var(--space-2) 0 calc(env(safe-area-inset-bottom) + var(--space-2));
      border-top: var(--border);
      background: var(--color-background);
    }

    .bottom-bar-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      min-width: var(--size-large);
      color: var(--color-foreground);
      text-decoration: none;
    }

    .bottom-bar-item[aria-current='page'] {
      color: var(--selection-foreground);
    }

    .bottom-bar-item em {
      display: flex;
      width: 4px;
      height: 4px;
      border-radius: var(--radius);
      background: var(--color-danger);
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(var(--space-3), -1.125rem);
    }
  `

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
    return html`
      <nav class="bottom-bar" aria-label=${this.label}>
        ${this.parsedItems.map(
          item => html`
            <a
              class="bottom-bar-item"
              href=${item.href ?? '#'}
              aria-current=${item.active ? 'page' : nothing}
            >
              <mm-avatar variant="tertiary" icon=${item.icon ?? ICON_NAMES.HOME}></mm-avatar>
              <mm-text size="12">${item.label}</mm-text>
              ${item.badge ? html`<em aria-hidden="true"></em>` : nothing}
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
