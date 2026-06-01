import { LitElement, css, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { getPreferredTheme, saveTheme, THEMES, type Theme } from '../../javascripts/theme'
import '../icon-button/icon-button'

@customElement('mm-theme-switcher')
export class ThemeSwitcher extends LitElement {
  @state() private theme: Theme = 'light'
  @state() private open = false

  static styles = css`
    :host {
      position: relative;
      display: inline-flex;
    }

    .dropdown {
      position: absolute;
      top: calc(100% + var(--space-1));
      right: 0;
      z-index: 100;
      min-width: 120px;
      background: var(--color-background);
      border: var(--border);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      overflow: hidden;
    }

    .option {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      width: 100%;
      padding: var(--space-2) var(--space-3);
      background: none;
      border: none;
      font: inherit;
      font-size: var(--font-size-14);
      color: var(--color-foreground);
      cursor: pointer;
      text-align: left;
      box-sizing: border-box;
    }

    .option:hover {
      background: var(--color-background-subtle);
    }

    .option[aria-current='true'] {
      color: var(--color-primary);
    }
  `

  connectedCallback() {
    super.connectedCallback()
    this.theme = getPreferredTheme()
    document.addEventListener('click', this._handleOutsideClick)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    document.removeEventListener('click', this._handleOutsideClick)
  }

  private _handleOutsideClick = (e: MouseEvent) => {
    if (!this.contains(e.target as Node)) this.open = false
  }

  private _select(theme: Theme) {
    this.theme = saveTheme(theme)
    this.open = false
  }

  render() {
    const currentTheme = THEMES.find(t => t.value === this.theme)

    return html`
      <mm-icon-button
        variant="plain"
        icon="${currentTheme?.icon ?? 'sun-light'}"
        aria-label="테마 변경"
        .haspopup=${true}
        .expanded=${this.open}
        @click=${() => (this.open = !this.open)}
      ></mm-icon-button>

      ${this.open
        ? html`
            <div class="dropdown" role="listbox" aria-label="테마 선택">
              ${THEMES.map(
                t => html`
                  <button
                    class="option"
                    role="option"
                    aria-current=${t.value === this.theme ? 'true' : 'false'}
                    @click=${() => this._select(t.value)}
                  >
                    <mm-icon name=${t.icon}></mm-icon>
                    ${t.label}
                  </button>
                `,
              )}
            </div>
          `
        : ''}
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-theme-switcher': ThemeSwitcher
  }
}
