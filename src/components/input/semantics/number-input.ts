import { html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import '../button/icon-button'
import { Textfield } from './textfield'

@customElement('mm-number-input')
export class NumberInput extends Textfield {
  @property({ type: Number }) min?: number
  @property({ type: Number }) max?: number
  @property({ type: Number }) step = 1

  protected override get fieldClasses() {
    return 'textfield number-input'
  }

  protected override get inputType() {
    return 'number'
  }

  protected override get inputClasses() {
    return 'textfield-input number-input-field'
  }

  protected override get showPrefix() {
    return true
  }

  protected override get showSuffix() {
    return true
  }

  private get numericValue() {
    const parsed = Number(this.value)
    if (Number.isFinite(parsed)) return parsed
    if (typeof this.min === 'number') return this.min
    return 0
  }

  private clamp(value: number) {
    if (typeof this.min === 'number' && value < this.min) return this.min
    if (typeof this.max === 'number' && value > this.max) return this.max
    return value
  }

  private commitValue(value: number) {
    this.value = String(this.clamp(value))
    this.dispatchInputEvent(this.value)
    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      }),
    )
  }

  private decrement() {
    if (this.disabled) return
    this.commitValue(this.numericValue - this.step)
  }

  private increment() {
    if (this.disabled) return
    this.commitValue(this.numericValue + this.step)
  }

  protected override renderPrefix(): unknown {
    return html`
      <mm-icon-button
        variant="plain"
        size="small"
        icon="minus"
        label="감소"
        tooltip="감소"
        tooltip-align="center"
        ?disabled=${this.disabled}
        @click=${this.decrement}
      ></mm-icon-button>
    `
  }

  protected override renderSuffix(): unknown {
    return html`
      <mm-icon-button
        variant="plain"
        size="small"
        icon="plus"
        label="증가"
        tooltip="증가"
        tooltip-align="center"
        ?disabled=${this.disabled}
        @click=${this.increment}
      ></mm-icon-button>
    `
  }

  protected override renderInput(): unknown {
    return html`
      <input
        id=${this.inputId}
        class=${this.inputClasses}
        type=${this.inputType}
        .value=${this.value}
        name=${this.name || nothing}
        placeholder=${this.placeholder || nothing}
        min=${this.min ?? nothing}
        max=${this.max ?? nothing}
        step=${this.step}
        ?disabled=${this.disabled}
        aria-invalid=${this.isInvalid ? 'true' : 'false'}
        aria-describedby=${this.validationText ? `${this.inputId}-validation` : nothing}
        @input=${this._handleInput}
      />
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-number-input': NumberInput
  }
}

export default NumberInput
