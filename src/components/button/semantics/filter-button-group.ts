import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { IconName } from '@/components/icon-button/semantics/icon-names'

import { buttonBaseStyles } from '@/components/button/button.styles'
import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'
import { SelectionController } from '@/controllers/selection-controller'
import { emit } from '@/utils/emit'
import '@/components/flex/flex'
import '@/components/icon/icon'

type FilterMode = 'single' | 'multiple'
export type FilterOption = {
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

      button[aria-selected='true'] {
        border: var(--border-width) solid var(--button-selected-border-color);
        background: var(--button-selected-background);
        color: var(--button-selected-text-color);
      }
    `,
  ]

  @property({ type: String }) mode: FilterMode = 'single'
  @property({ type: Array }) values: string[] = []
  @property({ type: Array }) options: FilterOption[] = []

  private selection = new SelectionController(this, {
    getMode: () => this.mode,
    getValues: () => this.values,
    setValues: values => {
      this.values = values
    },
    getOptions: () => this.options,
  })

  render() {
    return html`
      <mm-flex
        gap="2"
        wrap="wrap"
        role="listbox"
        aria-orientation="horizontal"
        aria-multiselectable=${this.isMultiple ? 'true' : 'false'}
      >
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
        role="option"
        aria-selected=${selected ? 'true' : 'false'}
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
