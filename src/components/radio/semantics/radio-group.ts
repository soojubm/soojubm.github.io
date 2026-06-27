import { LitElement, html } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'
import { Radio } from '../radio'
import { radioGroupStyles } from '../radio.styles' // 🔥 외부 스타일 임포트
import { emit } from '../../../utils/emit'

@customElement('mm-radio-group')
export class RadioGroup extends LitElement {
  // 🔥 분리한 스타일 지정
  static styles = [radioGroupStyles]

  @property({ type: String }) value = ''
  @property({ type: String }) name = ''
  @property({ type: Boolean }) disabled = false
  @property({ type: String }) label = ''

  @queryAssignedElements({ selector: 'mm-radio', flatten: true })
  private _radios!: Radio[]

  protected updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('value') || changedProperties.has('disabled')) {
      this._syncChildren()
    }
  }

  private _syncChildren() {
    this._radios.forEach(radio => {
      if (this.name) radio.name = this.name
      radio.disabled = this.disabled
      radio.checked = radio.value === this.value
    })
  }

  private _handleRadioChange(e: Event) {
    const target = e.target as Radio
    if (target.tagName.toLowerCase() !== 'mm-radio') return

    e.stopPropagation()

    if (target.checked) {
      const newValue = target.value || ''
      if (this.value === newValue) return

      this.value = newValue

      emit(this, 'change', { value: this.value, name: this.name })
    }
  }

  render() {
    return html`
      <fieldset class="radio-group" ?disabled=${this.disabled} @change=${this._handleRadioChange}>
        <legend class="visually-hidden">${this.label}</legend>
        <slot @slotchange=${this._syncChildren}></slot>
      </fieldset>
    `
  }
}

export default RadioGroup
