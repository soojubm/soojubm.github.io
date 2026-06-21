import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import type { IconName } from '../icon-button/semantics/icon-names'
import '../button/button-group'
import '../button/semantics/toggle-button'
import './semantics/view-mode-switcher'

interface OptionItem {
  value: string

  label?: string
  icon?: IconName

  ariaLabel?: string
  disabled?: boolean
}

@customElement('mm-toggle-button-group')
export class ToggleButtonGroup extends LitElement {
  @property({ type: String }) options = '[]'
  @property({ type: Number, attribute: 'selected-index' }) selectedIndex = 0
  @property({ type: Boolean, reflect: true }) stretch = false
  @state() private currentIndex = 0

  static styles = css`
    :host {
      --toggle-radius: var(--radius);
    }

    mm-button-group {
      --button-group-gap: 0;
      border-radius: var(--toggle-radius);
    }

    mm-toggle-button {
      --toggle-button-radius: 0;
    }

    mm-toggle-button:first-child {
      --toggle-button-radius: var(--toggle-radius) 0 0 var(--toggle-radius);
    }

    mm-toggle-button:last-child {
      --toggle-button-radius: 0 var(--toggle-radius) var(--toggle-radius) 0;
    }

    mm-toggle-button:only-child {
      --toggle-button-radius: var(--toggle-radius);
    }

    :host([stretch]) mm-button-group {
      width: 100%;
    }
  `

  connectedCallback() {
    super.connectedCallback()
    this.currentIndex = this.selectedIndex
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

  private onButtonClick(index: number, option: OptionItem, event: Event) {
    event.stopPropagation()
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

  render() {
    return html`
      <mm-button-group ?stretch=${this.stretch}>
        ${this.parsedOptions.map((option, index) => {
          const isSelected = index === this.currentIndex

          return html`
            <mm-toggle-button
              value=${option.value}
              icon=${option.icon ?? ''}
              aria-label=${option.ariaLabel ?? option.label ?? ''}
              ?selected=${isSelected}
              ?disabled=${option.disabled}
              @change=${(event: Event) => this.onButtonClick(index, option, event)}
            >
              ${option.label ?? ''}
            </mm-toggle-button>
          `
        })}
      </mm-button-group>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-toggle-button-group': ToggleButtonGroup
  }
}
