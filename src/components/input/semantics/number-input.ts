import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ICON_NAMES } from '../../icon-button/semantics/icon-names'
import { textfieldStyles } from './textfield.styles'
import '../../icon-button/icon-button'
import '../input'

@customElement('mm-number-input')
export class NumberInput extends LitElement {
  @property({ type: String }) value = ''
  @property({ type: String }) name?: string
  @property({ type: String }) placeholder?: string
  @property({ type: String }) label?: string
  @property({ type: String }) helper?: string
  @property({ type: String, attribute: 'validation-text' }) validationText?: string
  @property({ type: String, reflect: true }) size = ''
  @property({ type: Boolean, attribute: 'is-optional' }) isOptional = false
  @property({ type: Boolean, attribute: 'hidden-label', reflect: true }) hiddenLabel = false
  @property({ type: Boolean, reflect: true }) disabled = false
  @property({ type: Boolean, attribute: 'aria-invalid' }) isInvalid = false
  @property({ type: Number }) min?: number
  @property({ type: Number }) max?: number
  @property({ type: Number }) step = 1

  static styles = textfieldStyles

  private inputId = `input-${crypto?.randomUUID?.() || Math.random().toString(36).slice(2)}`

  render() {
    return html`
      <div class="textfield" ?data-invalid=${this.isInvalid}>
        ${this.label
          ? html`
              <mm-textfield-label for=${this.inputId} ?optional=${this.isOptional}>
                ${this.label}
              </mm-textfield-label>
            `
          : nothing}
        ${this.helper
          ? html`
              <div style="margin-top:-.25rem">
                <mm-textfield-helper>${this.helper}</mm-textfield-helper>
              </div>
            `
          : nothing}
        <div class="textfield-control">
          <mm-icon-button
            variant="ghost"
            size="small"
            icon=${ICON_NAMES.SUBTRACT}
            label="감소"
            tooltip="감소"
            tooltip-placement="center"
            ?disabled=${this.disabled}
            @click=${this._decrement}
          ></mm-icon-button>
          <mm-input
            input-id=${this.inputId}
            .type=${'number'}
            .value=${this.value}
            .name=${this.name}
            .placeholder=${this.placeholder}
            .min=${this.min}
            .max=${this.max}
            .step=${this.step}
            ?disabled=${this.disabled}
            ?invalid=${this.isInvalid}
            .describedBy=${this.validationText ? `${this.inputId}-validation` : undefined}
            @input=${this._handleInput}
          ></mm-input>
          <mm-icon-button
            variant="ghost"
            size="small"
            icon=${ICON_NAMES.ADD}
            label="증가"
            tooltip="증가"
            tooltip-placement="center"
            ?disabled=${this.disabled}
            @click=${this._increment}
          ></mm-icon-button>
        </div>
        ${this.validationText
          ? html`
              <mm-textfield-validation id=${`${this.inputId}-validation`}>
                ${this.validationText}
              </mm-textfield-validation>
            `
          : nothing}
      </div>
    `
  }

  private get _numericValue() {
    const parsed = Number(this.value)
    if (Number.isFinite(parsed)) return parsed
    if (typeof this.min === 'number') return this.min
    return 0
  }

  private _clamp(value: number) {
    if (typeof this.min === 'number' && value < this.min) return this.min
    if (typeof this.max === 'number' && value > this.max) return this.max
    return value
  }

  private _commit(value: number) {
    this.value = String(this._clamp(value))
    this.dispatchEvent(
      new CustomEvent('input', { bubbles: true, composed: true, detail: { value: this.value } }),
    )
    this.dispatchEvent(
      new CustomEvent('change', { bubbles: true, composed: true, detail: { value: this.value } }),
    )
  }

  private _decrement() {
    if (this.disabled) return
    this._commit(this._numericValue - this.step)
  }

  private _increment() {
    if (this.disabled) return
    this._commit(this._numericValue + this.step)
  }

  private _handleInput(event: Event) {
    const target = event.target as HTMLInputElement
    this.value = target.value
    this.dispatchEvent(
      new CustomEvent('input', { bubbles: true, composed: true, detail: { value: this.value } }),
    )
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-number-input': NumberInput
  }
}

export default NumberInput
