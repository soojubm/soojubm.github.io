import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

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
  @state() private currentIndex = 0

  static styles = css`
    .button-list {
      display: inline-flex;
      align-items: center;

      background: var(--color-background-subtle);
      border-radius: var(--radius);
      overflow: hidden;
    }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;

      min-height: var(--size-medium);
      padding: 0 var(--space-3);

      border: 0;
      background: transparent;
      cursor: pointer;

      font: inherit;
      color: var(--color-foreground);

      transition: background 0.2s, color 0.2s, opacity 0.2s;
    }

    button:hover {
      background: var(--color-background);
    }

    button.selected {
      background: var(--green100);
      color: var(--color-primary);
      font-weight: var(--font-weight-bold);
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
              @click=${() => this.onButtonClick(index, option)}
            >
              ${option.icon ? html` <mm-icon name=${option.icon}></mm-icon> ` : nothing}
              ${option.label ? html` <span class="label"> ${option.label} </span> ` : nothing}
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
