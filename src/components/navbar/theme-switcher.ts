import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import '../dropdown/dropdown'
import '../icon-button/icon-button'
import { getPreferredTheme, saveTheme, THEMES, type Theme } from '../../javascripts/theme'

@customElement('mm-theme-switcher')
export class ThemeSwitcher extends LitElement {
  @property({ type: String, reflect: true }) value: Theme = 'light'

  static styles = css`
    :host {
      display: inline-flex;
    }

    mm-dropdown::part(list) {
      left: auto;
      right: 0;
      min-width: 120px;
    }
  `

  connectedCallback(): void {
    super.connectedCallback()
    this.value = getPreferredTheme()
  }

  private get currentIcon(): string {
    return THEMES.find(theme => theme.value === this.value)?.icon ?? 'sun-light'
  }

  // 선택 시 테마를 저장하고 현재 값을 동기화
  private handleChange(e: CustomEvent) {
    this.value = saveTheme(e.detail.value as Theme)
  }

  render() {
    return html`
      <mm-dropdown .value=${this.value} @change=${this.handleChange}>
        <mm-icon-button
          slot="trigger"
          variant="plain"
          icon="${this.currentIcon}"
          aria-label="테마 변경"
        ></mm-icon-button>
        ${THEMES.map(
          theme => html`
            <option value=${theme.value} icon=${theme.icon} ?selected=${this.value === theme.value}>
              ${theme.label}
            </option>
          `,
        )}
      </mm-dropdown>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-theme-switcher': ThemeSwitcher
  }
}
