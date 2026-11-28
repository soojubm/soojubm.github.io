import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { repeat } from 'lit/directives/repeat.js'

import type { CheckboxSize } from '@/components/common/checkbox/checkbox'
import type { OptionItem } from '@/types'

import { checkboxStyles } from '@/components/common/checkbox/checkbox.styles'
import {
  inputSelectionGroupStyles,
  inputVisuallyHiddenStyles,
} from '@/components/common/input/input.styles'
import { MultipleSelection } from '@/controllers/multiple-selection'
import { resetStyles } from '@/stylesheets/shared.styles'
import { emit, uniqueId } from '@/utils'
import '@/components/common/text'

@customElement('fff-checkbox-group')
export class CheckboxGroup extends LitElement {
  static styles = [
    resetStyles,
    inputVisuallyHiddenStyles,
    inputSelectionGroupStyles,
    checkboxStyles,
  ]
  @property({ attribute: false }) options: OptionItem[] = []
  @property({ attribute: false }) values: string[] = []
  @property({ type: String }) name?: string
  @property({ type: String, reflect: true }) size: CheckboxSize = 'medium'
  @property({ type: String }) legend?: string
  // shadow 안에서만 쓰는 label 연결용 id라 컴포넌트의 id와 섞지 않는다.
  private idPrefix = uniqueId('checkbox-group')
  private selection = new MultipleSelection({
    getValues: () => this.values,
    setValues: values => {
      this.values = values
    },
    getOptions: () => this.options,
  })

  render() {
    return html`
      <fieldset>
        ${this.renderLegend()}
        ${repeat(
          this.options,
          option => option.value,
          option => this.renderOption(option),
        )}
      </fieldset>
    `
  }

  private renderLegend() {
    if (!this.legend) return nothing

    return html`
      <legend>${this.legend}</legend>
    `
  }

  private renderOption(option: OptionItem) {
    const inputId = `${this.idPrefix}-${option.value}`

    return html`
      <input
        type="checkbox"
        id=${inputId}
        name=${ifDefined(this.name)}
        .value=${option.value}
        .checked=${this.selection.isOptionSelected(option)}
        ?disabled=${option.disabled}
        @change=${() => this.handleOptionChange(option)}
      />
      <label for=${inputId}>
        <span class="indicator"></span>
        <fff-paragraph>${option.label}</fff-paragraph>
      </label>
    `
  }

  private handleOptionChange(option: OptionItem) {
    this.selection.select(option)
    this.dispatchValueChange()
  }

  private dispatchValueChange() {
    emit(this, 'change', { values: this.values })
  }
}
