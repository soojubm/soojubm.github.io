import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { InputType } from '@/components/common/input/input'

import { textfieldStyles } from '@/components/common/input/input.styles'
import {
  renderFieldDescription,
  renderFieldLabel,
  renderFieldValidation,
  withTextfieldState,
} from '@/components/common/input/semantics/textfield.helpers'
import '@/components/common/input/input'

@customElement('fff-textfield')
export class Textfield extends withTextfieldState(LitElement) {
  static styles = textfieldStyles
  @property({ type: String }) type: InputType = 'text'

  render() {
    return html`
      ${renderFieldLabel(this.inputId, this.label, this.optional)}
      <slot name="link"></slot>
      <div
        class="textfield-control"
        aria-invalid=${ifDefined(this.resolvedAriaInvalid ?? undefined)}
      >
        <slot name="leading"></slot>
        <fff-input
          input-id=${this.inputId}
          .type=${this.type}
          .value=${this.value}
          .name=${this.name}
          .placeholder=${this.placeholder}
          aria-label=${this.label ?? this.placeholder ?? nothing}
          ?disabled=${this.disabled}
          aria-invalid=${ifDefined(this.resolvedAriaInvalid ?? undefined)}
          aria-describedby=${this.describedBy || nothing}
          @input=${this.handleInput}
          @focusout=${this.handleInputFocusout}
        ></fff-input>
        <slot name="trailing"></slot>
      </div>
      ${renderFieldDescription(this.description, this.descriptionId)}
      ${renderFieldValidation(this.validationId, this.resolvedValidationText)}
    `
  }
}
