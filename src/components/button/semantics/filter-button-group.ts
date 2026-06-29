import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { IconName } from '@/components/icon-button/semantics/icon-names'

import { buttonBaseStyles } from '@/components/button/button.styles'
import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'
import { SelectedValuesController } from '@/controllers/selected-values-controller'
import { emit } from '@/utils/emit'
import '@/components/flex/flex'
import '@/components/icon/icon'

type FilterMode = 'single' | 'multiple'
type FilterOption = {
  value: string
  label: string
  icon?: IconName
  disabled?: boolean
  selectAll?: boolean
}

@customElement('mm-filter-button-group')
export class FilterButtonGroup extends LitElement {
  static styles = [
    buttonBaseStyles,
    css`
      :host {
        display: block;
      }

      button[aria-checked='true'] {
        border: var(--border-width) solid var(--button-selected-border-color);
        background: var(--button-selected-background);
        color: var(--button-selected-text-color);
      }
    `,
  ]

  @property({ type: String }) mode: FilterMode = 'single'
  @property({ type: Array }) values: string[] = []
  @property({ type: Array }) options: FilterOption[] = []

  private selection = new SelectedValuesController(this, {
    getMode: () => this.mode,
    getValues: () => this.values,
    setValues: values => {
      this.values = values
    },
    getOptions: () => this.options,
  })

  render() {
    return html`
      <mm-flex gap="2" wrap role=${this.isMultiple ? 'group' : 'radiogroup'}>
        ${this.options.map(option => this.renderOption(option))}
      </mm-flex>
    `
  }

  private get isMultiple() {
    return this.mode === 'multiple'
  }

  private renderOption(option: FilterOption) {
    const selected = this.selection.isOptionSelected(option)
    const iconName = option.icon ?? (selected ? ICON_NAMES.CHECK : undefined)

    return html`
      <button
        type="button"
        ?disabled=${option.disabled}
        role=${this.isMultiple ? 'checkbox' : 'radio'}
        aria-checked=${selected ? 'true' : 'false'}
        @click=${() => this.updateValues(option)}
      >
        ${iconName
          ? html`
              <mm-icon name=${iconName}></mm-icon>
            `
          : nothing}
        ${option.label}
      </button>
    `
  }

  private updateValues(option: FilterOption) {
    if (option.disabled) return

    this.selection.select(option)
    emit(this, 'change', { values: this.values })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-filter-button-group': FilterButtonGroup
  }
}
