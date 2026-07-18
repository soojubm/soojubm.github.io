import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'
import {
  renderFieldHelper,
  renderFieldLabel,
  renderFieldValidation,
  withTextfieldState,
} from '@/components/input/semantics/textfield.helpers'
import { textfieldStyles } from '@/components/input/semantics/textfield.styles'
import '@/components/icon-button/icon-button'
import '@/components/input/input'
import { emit } from '@/utils/emit'

@customElement('mm-number-input')
export class NumberInput extends withTextfieldState(LitElement) {
  static styles = textfieldStyles

  @property({ type: Number }) min?: number
  @property({ type: Number }) max?: number
  @property({ type: Number }) step = 1

  render() {
    return html`
      ${renderFieldLabel(this.inputId, this.label, this.optional)} ${renderFieldHelper(this.helper)}
      <div class="textfield-control" aria-invalid=${ifDefined(this.ariaInvalid ?? undefined)}>
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
          aria-invalid=${ifDefined(this.ariaInvalid ?? undefined)}
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
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-number-input': NumberInput
  }
}

export default NumberInput
