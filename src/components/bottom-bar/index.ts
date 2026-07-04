import { LitElement, css, html } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import { ICON_NAMES, type IconName } from '@/components/icon-button/semantics/icon-names'
import '@/components/text/semantics/caption'
import { focusRing } from '@/stylesheets/shared/focus-ring.styles'
import { SelectionIndicatorController } from '@/controllers/selection-indicator-controller'
import { emit } from '@/utils/emit'
import { arrayAttributeConverter } from '@/utils/property-converters'

interface BottomBarItem {
  label: string
  href?: string
  icon?: IconName
  active?: boolean
}

const defaultItems: BottomBarItem[] = [
  { label: '홈', href: '#', icon: ICON_NAMES.HOME, active: true },
  { label: '카테고리', href: '#', icon: ICON_NAMES.HOME },
  { label: '설정', href: '#', icon: ICON_NAMES.HOME },
]

@customElement('mm-bottom-bar')
class BottomBar extends LitElement {
  static styles = css`
    :host {
      --bottom-bar-item-height: calc(var(--size-medium) + var(--font-line-height-16));
    }

    nav {
      display: flex;
      padding: 0 0 calc(env(safe-area-inset-bottom));
      background: var(--color-background);
      position: relative;
    }

    a {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      min-width: var(--size-large);
      height: var(--bottom-bar-item-height);
      border-radius: var(--radius);
      color: var(--color-foreground);
      text-decoration: none;
      position: relative;
      z-index: 1;
    }

    a:focus-visible {
      ${focusRing}
    }

    a[aria-current='page'] {
      color: var(--selection-foreground);
    }

    a[aria-current='page'] mm-avatar {
      --avatar-icon-color: var(--selection-foreground);
    }

    a[aria-current='page'] mm-caption {
      --color-foreground-light: var(--selection-foreground);
    }

    .indicator {
      width: 0;
      height: var(--bottom-bar-item-height);
      border-radius: var(--radius-large);
      background: var(--selection-background);
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      transform: translateX(0);
      transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      pointer-events: none;
    }
  `

  @property({
    attribute: 'items',
    converter: arrayAttributeConverter<BottomBarItem>(defaultItems),
  })
  items: BottomBarItem[] = defaultItems
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = '하단 내비게이션'

  @state() private selectedIndex: number | null = null

  @query('nav') private bottomBar?: HTMLElement
  @query('.indicator') private indicator?: HTMLElement

  private indicatorPosition = new SelectionIndicatorController(this, {
    axis: 'x',
    autoUpdate: true,
    getContainer: () => this.bottomBar,
    getIndicator: () => this.indicator,
    getTarget: () =>
      this.renderRoot.querySelector<HTMLElement>("a[aria-current='page']") ?? undefined,
  })

  render() {
    const items = this.resolvedItems
    const activeIndex = this.resolveActiveIndex(items)

    return html`
      <nav aria-label=${this.ariaLabel}>
        <span class="indicator" aria-hidden="true"></span>
        ${this.renderItems(items, activeIndex)}
      </nav>
    `
  }

  private get resolvedItems() {
    if (!this.items.length) return defaultItems

    return this.items
  }

  private resolveActiveIndex(items: BottomBarItem[]) {
    if (this.selectedIndex !== null) return this.selectedIndex

    const activeIndex = items.findIndex(item => item.active)
    if (activeIndex < 0) return null

    return activeIndex
  }

  private renderItems(items: BottomBarItem[], activeIndex: number | null) {
    return items.map((item, index) => this.renderItem(item, index, activeIndex))
  }

  private renderItem(item: BottomBarItem, index: number, activeIndex: number | null) {
    return html`
      <a
        href=${item.href ?? '#'}
        aria-current=${ifDefined(activeIndex === index ? 'page' : undefined)}
        @click=${(e: Event) => this.handleItemClick(e, index)}
      >
        <mm-avatar variant="tertiary" icon=${item.icon ?? ICON_NAMES.HOME}></mm-avatar>
        <mm-caption>${item.label}</mm-caption>
      </a>
    `
  }

  private handleItemClick(e: Event, index: number) {
    e.preventDefault()
    this.selectedIndex = index
    emit(this, 'change', { index })
  }
}

export default BottomBar

declare global {
  interface HTMLElementTagNameMap {
    'mm-bottom-bar': BottomBar
  }
}
