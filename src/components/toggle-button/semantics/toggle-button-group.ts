import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { repeat } from 'lit/directives/repeat.js'
import type { IconName } from '../../icon-button/semantics/icon-names'
import '../../button/button-group'
import '../toggle-button'
import './view-mode-switcher'
import { emit } from '../../../utils/emit'

interface OptionItem {
  value: string

  label?: string
  icon?: IconName

  ariaLabel?: string
  disabled?: boolean
}

const parseOptions = (value: string | null): OptionItem[] => {
  try {
    const parsed = JSON.parse(value || '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

@customElement('mm-toggle-button-group')
export class ToggleButtonGroup extends LitElement {
  @property({
    attribute: 'options',
    converter: {
      fromAttribute: parseOptions,
      toAttribute: value => JSON.stringify(value),
    },
  })
  options: OptionItem[] = []
  @property({ type: Boolean, reflect: true }) stretch = false
  @property({ type: Number, attribute: 'selected-index' }) selectedIndex = 0

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

  private onButtonClick(index: number, option: OptionItem, event: Event) {
    event.stopPropagation()
    if (option.disabled) return

    this.selectedIndex = index

    emit(this, 'change', {
      index,
      value: option.value,
    })
  }

  render() {
    return html`
      <mm-button-group ?stretch=${this.stretch}>
        ${repeat(
          this.options,
          option => option.value,
          (option, index) => {
            const isSelected = index === this.selectedIndex

            return html`
              <mm-toggle-button
                value=${option.value}
                icon=${option.icon || nothing}
                aria-label=${option.ariaLabel ?? option.label ?? ''}
                ?selected=${isSelected}
                ?disabled=${option.disabled}
                @change=${(event: Event) => this.onButtonClick(index, option, event)}
              >
                ${option.label ?? ''}
              </mm-toggle-button>
            `
          },
        )}
      </mm-button-group>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-toggle-button-group': ToggleButtonGroup
  }
}
