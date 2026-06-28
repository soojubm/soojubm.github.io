import { LitElement, css, html } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import '@/components/icon-button/icon-button'
import '@/components/menuitem/semantics/menu-item-action'
import '@/components/radius-picker/radius-picker'
import '@/components/separator/separator'
import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'
import { PopupController } from '@/controllers/popup-controller'
import { getPreferredTheme, saveTheme, THEMES, type Theme } from '@/utils/theme'

@customElement('mm-theme-switcher')
export class ThemeSwitcher extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      position: relative;
    }

    .theme-switcher {
      position: relative;
    }

    .panel {
      display: flex;
      flex-direction: column;

      min-width: calc(var(--width-small) - var(--space-4) * 5);
      max-height: var(--width-small);

      padding: var(--space-1);
      border: var(--border);
      border-radius: var(--radius);
      background: var(--color-background);
      box-shadow: var(--shadow);

      position: absolute;
      top: calc(100% + var(--space-1));
      right: 0;
      z-index: calc(var(--zindex-fixed-bottom) + 1);

      overflow-y: auto;
      box-sizing: border-box;

      opacity: 0;
      transform: translateY(var(--space-1-minus)) scale(0.98);
      transform-origin: top right;
      visibility: hidden;
      pointer-events: none;
      transition: opacity 120ms ease, transform 180ms cubic-bezier(0.2, 0.8, 0.2, 1),
        visibility 0s linear 180ms;
    }

    .panel[open] {
      opacity: 1;
      transform: translateY(0) scale(1);
      visibility: visible;
      pointer-events: auto;
      transition: opacity 120ms ease, transform 220ms cubic-bezier(0.18, 1.25, 0.4, 1),
        visibility 0s;
    }

    mm-menu-item-action[aria-current='true'] {
      color: var(--selection-foreground);
    }
  `

  @property({ type: String }) value: Theme = 'light'

  @query('.js-theme-trigger') private trigger?: HTMLElement

  private popup = new PopupController(this, {
    event: 'click',
    getTrigger: () => this.trigger,
  })

  render() {
    return html`
      <div class="theme-switcher">
        <mm-icon-button
          class="js-theme-trigger"
          variant="ghost"
          icon=${this.currentIcon}
          aria-label="테마 변경"
          aria-haspopup="menu"
          aria-expanded=${this.popup.open ? 'true' : 'false'}
          @click=${this.toggleOpen}
        ></mm-icon-button>
        <div
          class="panel"
          ?open=${this.popup.open}
          role="menu"
          aria-hidden=${this.popup.open ? 'false' : 'true'}
        >
          ${this.renderThemeOptions()}
          <mm-separator spacing="small"></mm-separator>
          <mm-radius-picker></mm-radius-picker>
        </div>
      </div>
    `
  }

  private renderThemeOptions() {
    return THEMES.map(theme => this.renderThemeOption(theme))
  }

  private renderThemeOption(theme: typeof THEMES[number]) {
    return html`
      <mm-menu-item-action
        icon=${theme.icon}
        aria-current=${ifDefined(theme.value === this.value ? 'true' : undefined)}
        @click=${(event: Event) => this.handleThemeChange(theme.value, event)}
      >
        ${theme.label}
      </mm-menu-item-action>
    `
  }

  connectedCallback(): void {
    super.connectedCallback()
    this.value = getPreferredTheme()
  }

  private get currentIcon(): string {
    return THEMES.find(theme => theme.value === this.value)?.icon ?? ICON_NAMES.LIGHT_MODE
  }

  private toggleOpen() {
    this.popup.toggle()
  }

  // 선택 시 테마를 저장하고 현재 값을 동기화
  private handleThemeChange(theme: Theme, event: Event) {
    event.stopPropagation()
    this.value = saveTheme(theme)
    this.popup.close()
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-theme-switcher': ThemeSwitcher
  }
}
