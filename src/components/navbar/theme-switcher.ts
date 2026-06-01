import { css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import Dropdown, { DropdownOption } from '../dropdown/dropdown'
import { getPreferredTheme, saveTheme, THEMES, type Theme } from '../../javascripts/theme'
import '../icon-button/icon-button'

@customElement('mm-theme-switcher')
export class ThemeSwitcher extends Dropdown {
  @property({ type: String, reflect: true }) value: Theme = 'light'

  static styles = [
    ...Dropdown.styles,
    css`
      :host {
        display: inline-flex;
      }

      .dropdown {
        width: auto;
      }

      .dropdown-list {
        left: auto;
        right: 0;
        min-width: 120px;
      }
    `,
  ]

  connectedCallback(): void {
    this.value = getPreferredTheme()
    super.connectedCallback()
  }

  protected get defaultOptions(): DropdownOption[] {
    return THEMES.map(theme => ({
      label: theme.label,
      value: theme.value,
      type: 'default',
      checked: false,
      selected: this.value === theme.value,
      icon: theme.icon,
    }))
  }

  protected renderTrigger() {
    const currentTheme = THEMES.find(theme => theme.value === this.value)

    return html`
      <mm-icon-button
        variant="plain"
        icon="${currentTheme?.icon ?? 'sun-light'}"
        aria-label="테마 변경"
        .haspopup=${true}
        .expanded=${this.isOpen}
        @click=${this.toggleOpen}
      ></mm-icon-button>
    `
  }

  protected selectOption(option: DropdownOption) {
    this.value = saveTheme(option.value as Theme)
    this.isOpen = false
    this.emitSelectChange(option)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-theme-switcher': ThemeSwitcher
  }
}
