import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import { ICON_NAMES } from '@/components/common/icon/icon-names'
import { textfieldStyles } from '@/components/common/input/input.styles'
import {
  renderFieldDescription,
  renderFieldLabel,
  renderFieldValidation,
  withTextfieldState,
} from '@/components/common/input/semantics/textfield.helpers'
import '@/components/common/icon-button/icon-button'
import '@/components/common/input/input'
import { emit } from '@/utils'

@customElement('mm-quantity-field')
export class QuantityField extends withTextfieldState(LitElement) {
  static styles = [
    textfieldStyles,
    css`
      .textfield-control {
        max-width: 10rem;
      }
    `,
  ]
  @property({ type: Number }) min?: number
  @property({ type: Number }) max?: number
  @property({ type: Number }) step = 1

  render() {
    return html`
      ${renderFieldLabel(this.inputId, this.label, this.optional)}
      <div
        class="textfield-control"
        aria-invalid=${ifDefined(this.resolvedAriaInvalid ?? undefined)}
      >
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
          aria-invalid=${ifDefined(this.resolvedAriaInvalid ?? undefined)}
          aria-describedby=${this.describedBy || nothing}
          @input=${this.handleInput}
          @focusout=${this.handleInputFocusout}
        ></mm-input>
        <mm-icon-button
          variant="secondary"
          size="small"
          icon=${ICON_NAMES.SUBTRACT}
          aria-label="감소"
          tooltip-placement="bottom"
          ?disabled=${this.disabled}
          @click=${this.handleDecrementClick}
        ></mm-icon-button>
        <mm-icon-button
          variant="secondary"
          size="small"
          icon=${ICON_NAMES.ADD}
          aria-label="증가"
          tooltip-placement="bottom"
          ?disabled=${this.disabled}
          @click=${this.handleIncrementClick}
        ></mm-icon-button>
      </div>
      ${renderFieldDescription(this.description, this.descriptionId)}
      ${renderFieldValidation(this.validationId, this.resolvedValidationText)}
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

  private handleDecrementClick() {
    if (this.disabled) return
    this.commit(this.numericValue - this.step)
  }

  private handleIncrementClick() {
    if (this.disabled) return
    this.commit(this.numericValue + this.step)
  }
}
