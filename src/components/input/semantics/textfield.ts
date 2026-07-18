import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { InputType } from '@/components/input/input'

import {
  renderFieldHelper,
  renderFieldLabel,
  renderFieldValidation,
  withTextfieldState,
} from '@/components/input/semantics/textfield.helpers'
import { textfieldStyles } from '@/components/input/semantics/textfield.styles'
import '@/components/input/input'

@customElement('mm-textfield')
export class Textfield extends withTextfieldState(LitElement) {
  static styles = textfieldStyles

  @property({ type: String }) type: InputType = 'text'

  render() {
    return html`
      ${renderFieldLabel(this.inputId, this.label, this.optional)} ${renderFieldHelper(this.helper)}
      <slot name="link"></slot>
      <div class="textfield-control" aria-invalid=${ifDefined(this.ariaInvalid ?? undefined)}>
        <slot name="leading"></slot>
        <mm-input
          input-id=${this.inputId}
          .type=${this.type}
          .value=${this.value}
          .name=${this.name}
          .placeholder=${this.placeholder}
          aria-label=${this.label ?? this.placeholder ?? nothing}
          ?disabled=${this.disabled}
          aria-invalid=${ifDefined(this.ariaInvalid ?? undefined)}
          aria-describedby=${this.validationText ? `${this.inputId}-validation` : nothing}
          @input=${this.handleInput}
        ></mm-input>
        <slot name="trailing"></slot>
      </div>
      ${renderFieldValidation(`${this.inputId}-validation`, this.validationText)}
    `
  }
}

export default Textfield
