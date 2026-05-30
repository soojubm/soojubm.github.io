import { LitElement, css, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { resetStyles } from '../shared/reset.styles'

type Theme = 'light' | 'dark' | 'brutal'

const THEMES: { value: Theme; icon: string; label: string }[] = [
  { value: 'light',  icon: 'sun-light',    label: 'Day' },
  { value: 'dark',   icon: 'half-moon',    label: 'Night' },
  { value: 'brutal', icon: 'color-filter', label: 'Brutal' },
]

@customElement('mm-theme-switcher')
export class ThemeSwitcher extends LitElement {
  @state() private theme: Theme = 'light'
  @state() private open = false

  static styles = [
    resetStyles,
    css`
      :host {
        position: relative;
        display: inline-flex;
      }

      /* ── 트리거 버튼 ── */
      .trigger {
        position: relative;
        width: var(--size-small);
        height: var(--size-small);
        border: none;
        background: none;
        cursor: pointer;
        padding: 0;
        border-radius: var(--radius);
        overflow: hidden;
        color: var(--color-foreground);
      }

      .trigger:focus-visible {
        outline: 3px solid var(--color-primary);
        outline-offset: 2px;
      }

      .track {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .slot {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--size-small);
        height: var(--size-small);
      }

      /* ── 드롭다운 ── */
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
        font-weight: var(--font-weight-bold);
        color: var(--color-primary);
      }
    `,
  ]

  connectedCallback() {
    super.connectedCallback()
    const saved = localStorage.getItem('theme') as Theme | null
    if (saved && THEMES.some(t => t.value === saved)) {
      this.theme = saved
    }
    document.addEventListener('click', this._handleOutsideClick)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    document.removeEventListener('click', this._handleOutsideClick)
  }

  private _handleOutsideClick = (e: MouseEvent) => {
    if (!this.contains(e.target as Node)) this.open = false
  }

  private get _index() {
    return THEMES.findIndex(t => t.value === this.theme)
  }

  private _select(theme: Theme) {
    this.theme = theme
    document.body.dataset.theme = theme
    localStorage.setItem('theme', theme)
    this.open = false
  }

  render() {
    const offsetY = `translateY(calc(var(--size-small) * ${-this._index}))`

    return html`
      <button
        class="trigger"
        aria-label="테마 변경"
        aria-haspopup="listbox"
        aria-expanded=${this.open}
        @click=${() => (this.open = !this.open)}
      >
        <span class="track" style="transform: ${offsetY}">
          ${THEMES.map(
            t => html`
              <span class="slot">
                <mm-icon name=${t.icon}></mm-icon>
              </span>
            `,
          )}
        </span>
      </button>

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
                    <mm-icon name=${t.icon} size="small"></mm-icon>
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
