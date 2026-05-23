import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { Radio } from './radio'

@customElement('mm-radio-group')
export class RadioGroup extends LitElement {
  @property({ type: String, reflect: true }) value = ''
  @property({ type: String }) name = ''
  @property({ type: Boolean, reflect: true }) disabled = false

  // 🔥 스크린 리더가 읽어줄 그룹의 목적/이름을 받기 위한 프로퍼티 추가
  @property({ type: String }) label = ''

  static styles = css`
    fieldset {
      border: none;
      padding: 0;
      margin: 0;
      min-width: 0;
    }

    .radio-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    /* 🔥 스크린 리더는 인식하지만, 화면에서는 완벽히 숨기는 표준 CSS 패턴 */
    .visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `

  protected updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('value') || changedProperties.has('disabled')) {
      this._syncChildren()
    }
  }

  private _getRadios(): Radio[] {
    return Array.from(this.querySelectorAll('mm-radio')) as Radio[]
  }

  private _syncChildren() {
    const radios = this._getRadios()
    radios.forEach(radio => {
      if (this.name) radio.name = this.name
      if (this.disabled) radio.disabled = this.disabled
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

      this.dispatchEvent(
        new CustomEvent('change', {
          bubbles: true,
          composed: true,
          detail: { value: this.value, name: this.name },
        }),
      )
    }
  }

  private _handleSlotChange() {
    this._syncChildren()
  }

  render() {
    return html`
      <fieldset class="radio-group" @change=${this._handleRadioChange}>
        <legend class="visually-hidden">${this.label}</legend>
        <slot @slotchange=${this._handleSlotChange}></slot>
      </fieldset>
    `
  }
}

export default RadioGroup
