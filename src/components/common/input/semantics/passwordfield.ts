import { LitElement, html, nothing } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import { textfieldStyles } from '@/components/common/input/input.styles'
import {
  renderFieldDescription,
  renderFieldLabel,
  renderFieldValidation,
  withTextfieldState,
} from '@/components/common/input/semantics/textfield.helpers'
import '@/components/common/icon-button/semantics/reveal-button'
import '@/components/common/input/input'

@customElement('mm-passwordfield')
export class PasswordField extends withTextfieldState(LitElement) {
  static styles = textfieldStyles
  @state() private revealed = false

  render() {
    return html`
      ${renderFieldLabel(this.inputId, this.label, this.optional)}
      <slot name="link"></slot>
      <div
        class="textfield-control"
        aria-invalid=${ifDefined(this.resolvedAriaInvalid ?? undefined)}
      >
        <mm-input
          input-id=${this.inputId}
          .type=${this.revealed ? 'text' : 'password'}
          .value=${this.value}
          .name=${this.name}
          .placeholder=${this.placeholder}
          aria-label=${this.label ?? this.placeholder ?? nothing}
          ?disabled=${this.disabled}
          aria-invalid=${ifDefined(this.resolvedAriaInvalid ?? undefined)}
          aria-describedby=${this.describedBy || nothing}
          @input=${this.handleInput}
          @focusout=${this.handleInputFocusout}
        ></mm-input>
        <mm-reveal-button
          .revealed=${this.revealed}
          ?disabled=${this.disabled}
          @toggle=${this.handleRevealToggle}
        ></mm-reveal-button>
      </div>
      ${renderFieldDescription(this.description, this.descriptionId)}
      ${renderFieldValidation(this.validationId, this.resolvedValidationText)}
    `
  }

  private handleRevealToggle(event: CustomEvent<{ revealed: boolean }>) {
    event.stopPropagation()
    this.revealed = event.detail.revealed
  }
}
