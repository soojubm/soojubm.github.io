import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { AriaInvalid } from '@/types/aria'

import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'
import {
  renderFieldHelper,
  renderFieldLabel,
  renderFieldValidation,
} from '@/components/input/semantics/textfield.helpers'
import { textfieldStyles } from '@/components/input/semantics/textfield.styles'
import '@/components/icon-button/icon-button'
import '@/components/input/input'
import { emit } from '@/utils/emit'
import { uniqueId } from '@/utils/unique-id'

@customElement('mm-number-input')
export class NumberInput extends LitElement {
  static styles = textfieldStyles

  @property({ type: String }) value = ''
  @property({ type: String }) name = ''
  @property({ type: String }) placeholder = ''
  @property({ type: String }) label?: string
  @property({ type: String }) helper?: string
  @property({ type: String, attribute: 'validation-text' }) validationText?: string
  @property({ type: String, reflect: true }) size = ''
  @property({ type: Boolean }) optional = false
  @property({ type: Boolean, attribute: 'hidden-label', reflect: true }) hiddenLabel = false
  @property({ type: Boolean }) disabled = false
  @property({ type: String, attribute: 'aria-invalid' }) ariaInvalid: AriaInvalid = null
  @property({ type: Number }) min?: number
  @property({ type: Number }) max?: number
  @property({ type: Number }) step = 1

  private inputId = uniqueId('input')

  render() {
    return html`
      <div class="textfield" ?data-invalid=${this.ariaInvalid === 'true'}>
        ${renderFieldLabel(this.inputId, this.label, this.optional)}
        ${renderFieldHelper(this.helper)}
        <div class="textfield-control">
          <mm-input
            input-id=${this.inputId}
            .type=${'number'}
            .value=${this.value}
            .name=${this.name}
            .placeholder=${this.placeholder}
            aria-label=${this.label ?? this.placeholder ?? nothing}
            .min=${this.min}
            .max=${this.max}
            .step=${this.step}
            ?disabled=${this.disabled}
            aria-invalid=${this.ariaInvalid ?? nothing}
            aria-describedby=${this.validationText ? `${this.inputId}-validation` : nothing}
            @input=${this.handleInput}
          ></mm-input>
          <mm-icon-button
            variant="ghost"
            size="small"
            icon=${ICON_NAMES.SUBTRACT}
            aria-label="감소"
            tooltip="감소"
            tooltip-placement="center"
            ?disabled=${this.disabled}
            @click=${this.decrement}
          ></mm-icon-button>
          <mm-icon-button
            variant="ghost"
            size="small"
            icon=${ICON_NAMES.ADD}
            aria-label="증가"
            tooltip="증가"
            tooltip-placement="center"
            ?disabled=${this.disabled}
            @click=${this.increment}
          ></mm-icon-button>
        </div>
        ${renderFieldValidation(`${this.inputId}-validation`, this.validationText)}
      </div>
    `
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

  private commit(value: number) {
    this.value = String(this.clamp(value))
    emit(this, 'input', { value: this.value })
    emit(this, 'change', { value: this.value })
  }

  private decrement() {
    if (this.disabled) return
    this.commit(this.numericValue - this.step)
  }

  private increment() {
    if (this.disabled) return
    this.commit(this.numericValue + this.step)
  }

  private handleInput(event: Event) {
    const target = event.target as HTMLInputElement
    this.value = target.value
    emit(this, 'input', { value: this.value })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-number-input': NumberInput
  }
}

export default NumberInput
