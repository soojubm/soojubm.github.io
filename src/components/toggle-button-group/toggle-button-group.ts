import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import './semantics/view-mode-switcher'

interface OptionItem {
  value: string

  label?: string
  icon?: string

  ariaLabel?: string
  disabled?: boolean
}

@customElement('mm-toggle-button-group')
export class ToggleButtonGroup extends LitElement {
  @property({ type: String }) options = '[]'
  @property({ type: Number }) selectedIndex = 0
  @property({ type: Boolean, reflect: true }) stretch = false
  @state() private currentIndex = 0

  static styles = css`
    :host {
      --toggle-size: var(--size-medium);
      --toggle-padding-inline: var(--space-3);
      --toggle-radius: var(--radius);
      --toggle-color: var(--color-background);
      --toggle-border: 1px solid var(--color-border-strong);
      --toggle-text-color: var(--color-foreground);
      --toggle-selected-color: var(--selection-background);
      --toggle-selected-border-color: var(--selection-indicator-color);
      --toggle-selected-text-color: var(--selection-foreground);
      --toggle-group-background: var(--color-background-subtle);
    }

    .button-list {
      display: inline-flex;
      align-items: center;

      background: var(--toggle-group-background);
      border-radius: var(--toggle-radius);
    }

    button:first-child {
      border-start-start-radius: var(--toggle-radius);
      border-end-start-radius: var(--toggle-radius);
    }

    button:last-child {
      border-start-end-radius: var(--toggle-radius);
      border-end-end-radius: var(--toggle-radius);
    }

    :host([stretch]) .button-list {
      display: flex;
      width: 100%;
    }

    :host([stretch]) button {
      flex: 1;
    }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-2);

      min-height: var(--toggle-size);
      padding: 0 var(--toggle-padding-inline);

      border: var(--toggle-border);
      box-sizing: border-box;
      background: var(--toggle-color);
      cursor: pointer;

      font: inherit;
      color: var(--toggle-text-color);

      transition: background 0.2s, color 0.2s, opacity 0.2s;
    }

    button:hover {
      background: var(--color-background);
    }

    button.selected {
      border-color: var(--toggle-selected-border-color);
      background: var(--toggle-selected-color);
      color: var(--toggle-selected-text-color);
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .label {
      white-space: nowrap;
    }
  `

  connectedCallback() {
    super.connectedCallback()
    this.currentIndex = this.selectedIndex
    this.addEventListener('click', this.handleHostClick)
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.handleHostClick)
    super.disconnectedCallback()
  }

  protected updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('selectedIndex')) {
      this.currentIndex = this.selectedIndex
    }
  }

  private get parsedOptions(): OptionItem[] {
    try {
      const parsed = JSON.parse(this.options)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }

  private onButtonClick(index: number, option: OptionItem) {
    if (option.disabled) return

    this.currentIndex = index

    this.dispatchEvent(
      new CustomEvent('option-change', {
        detail: {
          index,
          value: option.value,
        },
        bubbles: true,
        composed: true,
      }),
    )

    this.dispatchEvent(
      new CustomEvent('optionChange', {
        detail: {
          index,
          value: option.value,
        },
        bubbles: true,
        composed: true,
      }),
    )
  }

  private handleHostClick = (event: MouseEvent) => {
    const button = event.composedPath().find(target => target instanceof HTMLButtonElement)
    if (!(button instanceof HTMLButtonElement)) return

    const buttons = Array.from(this.renderRoot.querySelectorAll('button'))
    const index = buttons.indexOf(button)
    const option = this.parsedOptions[index]

    if (!option) return
    this.onButtonClick(index, option)
  }

  render() {
    return html`
      <div class="button-list" role="group">
        ${this.parsedOptions.map((option, index) => {
          const isSelected = index === this.currentIndex
          // const isIconOnly = option.icon && !option.label

          return html`
            <button
              type="button"
              class=${`
                ${isSelected ? 'selected' : ''}
              `}
              ?disabled=${option.disabled}
              ?aria-pressed=${isSelected}
              aria-label=${option.ariaLabel ?? option.label ?? ''}
            >
              ${option.icon
                ? html`
                    <mm-icon name=${option.icon}></mm-icon>
                  `
                : nothing}
              ${option.label
                ? html`
                    <span class="label">${option.label}</span>
                  `
                : nothing}
            </button>
          `
        })}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-toggle-button-group': ToggleButtonGroup
  }
}
