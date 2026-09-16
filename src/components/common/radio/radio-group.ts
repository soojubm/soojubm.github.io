import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { repeat } from 'lit/directives/repeat.js'

import type { OptionItem } from '@/types'

import { visuallyHiddenInputStyles } from '@/components/common/input/input.styles'
import { radioGroupStyles, radioStyles } from '@/components/common/radio/radio.styles'
import { SingleSelectionController } from '@/controllers/single-selection-controller'
import { resetStyles } from '@/stylesheets/shared.styles'
import { emit, uniqueId } from '@/utils'
import '@/components/common/text/semantics/paragraph'

// 같은 name의 네이티브 radio가 한 shadow root에 모여야 방향키 이동과 단일 선택을 브라우저가 처리한다.
// 그래서 mm-radio를 감싸지 않고, 공유 스타일 모듈(radioStyles)을 조합해 input을 직접 렌더한다.
@customElement('mm-radio-group')
export class RadioGroup extends LitElement {
  static styles = [resetStyles, visuallyHiddenInputStyles, radioGroupStyles, radioStyles]
  @property({ attribute: false }) options: OptionItem[] = []
  @property({ type: String }) value = ''
  @property({ type: String }) name = ''
  @property({ type: String, reflect: true }) size?: string
  @property({ type: Boolean }) disabled = false
  @property({ type: String }) legend = ''
  // name을 주지 않아도 네이티브 radio가 한 그룹으로 묶이도록 내부 이름을 둔다.
  private fallbackName = uniqueId('radio-group')
  private selection = new SingleSelectionController(this, {
    getValue: () => this.value,
    setValue: value => {
      this.value = value
    },
  })

  render() {
    return html`
      <fieldset class="radio-group" ?disabled=${this.disabled}>
        <legend>${this.legend}</legend>
        ${repeat(
          this.options,
          option => option.value,
          option => this.renderOption(option),
        )}
      </fieldset>
    `
  }

  private renderOption(option: OptionItem) {
    const inputId = `${this.fallbackName}-${option.value}`

    return html`
      <input
        type="radio"
        id=${inputId}
        name=${this.name || this.fallbackName}
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

  private handleOptionChange(option: OptionItem) {
    this.selection.select(option)
    emit(this, 'change', { value: this.value, name: this.name })
  }
}
