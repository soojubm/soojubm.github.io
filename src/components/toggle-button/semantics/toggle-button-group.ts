import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { repeat } from 'lit/directives/repeat.js'

import type { IconName } from '@/components/icon-button/semantics/icon-names'

import '@/components/flex/flex'
import '@/components/toggle-button/toggle-button'
import '@/components/toggle-button/semantics/view-mode-switcher'
import { emit } from '@/utils/emit'
import { arrayAttributeConverter } from '@/utils/property-converters'

interface OptionItem {
  value: string

  label?: string
  icon?: IconName

  ariaLabel?: string
  disabled?: boolean
}

@customElement('mm-toggle-button-group')
export class ToggleButtonGroup extends LitElement {
  static styles = css`
    :host {
      --toggle-radius: var(--radius);
    }

    mm-flex {
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

    :host([stretch]) mm-flex {
      width: 100%;
    }
  `

  @property({
    attribute: 'options',
    converter: arrayAttributeConverter<OptionItem>(),
  })
  options: OptionItem[] = []
  @property({ type: Boolean, reflect: true }) stretch = false
  @property({ type: Number, attribute: 'selected-index' }) selectedIndex = 0

  render() {
    return html`
      <mm-flex align-items="center" gap="0" ?stretch=${this.stretch}>
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
      </mm-flex>
    `
  }

  private onButtonClick(index: number, option: OptionItem, event: Event) {
    event.stopPropagation()
    if (option.disabled) return

    this.selectedIndex = index

    emit(this, 'change', {
      index,
      value: option.value,
    })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-toggle-button-group': ToggleButtonGroup
  }
}
