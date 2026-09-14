import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { repeat } from 'lit/directives/repeat.js'

import type { OptionItem } from '@/types'

import { checkboxGroupStyles, checkboxStyles } from '@/components/common/checkbox/checkbox.styles'
import { visuallyHiddenInputStyles } from '@/components/common/input/input.styles'
import { MultipleSelectionController } from '@/controllers/multiple-selection-controller'
import { resetStyles } from '@/stylesheets/shared.styles'
import { emit, uniqueId } from '@/utils'
import '@/components/common/text'

// mm-radio-group처럼 mm-checkbox를 감싸지 않고, 공유 스타일 모듈(checkboxStyles)을 조합해 input을 직접 렌더한다.
// 그래야 선택 상태를 shadow 경계 없이 그룹이 온전히 소유한다.
@customElement('mm-checkbox-group')
export class CheckboxGroup extends LitElement {
  static styles = [resetStyles, visuallyHiddenInputStyles, checkboxGroupStyles, checkboxStyles]

  @property({ attribute: false }) options: OptionItem[] = []
  @property({ attribute: false }) values: string[] = []
  @property({ type: String }) name?: string
  @property({ type: String, reflect: true }) size?: string
  @property({ type: String }) legend?: string

  // shadow 안에서만 쓰는 label 연결용 id라 호스트의 id와 섞지 않는다.
  private idPrefix = uniqueId('checkbox-group')

  private selection = new MultipleSelectionController(this, {
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
      <legend>
        <mm-text size="12" color="light">${this.legend}</mm-text>
      </legend>
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
        <mm-paragraph>${option.label}</mm-paragraph>
      </label>
    `
  }

  get checked() {
    const selectable = this.selectableOptions
    return (
      selectable.length > 0 && selectable.every(option => this.selection.isOptionSelected(option))
    )
  }

  get indeterminate() {
    const selectable = this.selectableOptions
    const checkedCount = selectable.filter(option => this.selection.isOptionSelected(option)).length

    return checkedCount > 0 && checkedCount < selectable.length
  }

  toggleAll() {
    const checked = !this.checked
    const selectableValues = this.selectableOptions.map(option => option.value)
    const otherValues = this.values.filter(value => !selectableValues.includes(value))

    this.values = checked ? [...otherValues, ...selectableValues] : otherValues
    this.dispatchValueChange()
  }

  private get selectableOptions() {
    return this.options.filter(option => !option.disabled)
  }

  private handleOptionChange(option: OptionItem) {
    this.selection.select(option)
    this.dispatchValueChange()
  }

  private dispatchValueChange() {
    emit(this, 'change', { values: this.values })
  }
}
