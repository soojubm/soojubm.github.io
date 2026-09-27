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
      <div class="textfield-control" aria-invalid=${ifDefined(this.ariaInvalid ?? undefined)}>
        <mm-input
          input-id=${this.inputId}
          .type=${this.revealed ? 'text' : 'password'}
          .value=${this.value}
          .name=${this.name}
          .placeholder=${this.placeholder}
          aria-label=${this.label ?? this.placeholder ?? nothing}
          aria-invalid=${ifDefined(this.ariaInvalid ?? undefined)}
          aria-describedby=${this.describedBy || nothing}
          @input=${this.handleInput}
        ></mm-input>
        <mm-reveal-button
          .revealed=${this.revealed}
          @toggle=${this.handleRevealToggle}
        ></mm-reveal-button>
      </div>
      ${renderFieldDescription(this.description, `${this.inputId}-description`)}
      ${renderFieldValidation(`${this.inputId}-validation`, this.validationText)}
    `
  }

  private handleRevealToggle(event: CustomEvent<{ revealed: boolean }>) {
    event.stopPropagation()
    this.revealed = event.detail.revealed
  }
}
