import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { AriaInvalid } from '@/types'

import { textfieldStyles } from '@/components/common/input/input.styles'
import {
  renderFieldHelper,
  renderFieldLabel,
} from '@/components/common/input/semantics/textfield.helpers'
import '@/components/common/input/textarea'
import { uniqueId } from '@/utils'

@customElement('mm-textarea-field')
export class TextareaField extends LitElement {
  static styles = textfieldStyles

  @property({ type: String }) value = ''
  @property({ type: String }) name = ''
  @property({ type: String }) placeholder = ''
  @property({ type: String }) label?: string
  @property({ type: String }) helper?: string
  @property({ type: Number }) rows = 3
  @property({ type: Boolean }) optional = false
  @property({ type: Boolean }) disabled = false
  @property({ type: String, attribute: 'aria-invalid' }) ariaInvalid: AriaInvalid = null

  private inputId = uniqueId('mm-textarea')

  render() {
    return html`
      ${renderFieldLabel(this.inputId, this.label, this.optional)}
      <mm-textarea
        input-id=${this.inputId}
        .value=${this.value}
        .name=${this.name}
        .placeholder=${this.placeholder}
        .rows=${this.rows}
        ?disabled=${this.disabled}
        aria-invalid=${ifDefined(this.ariaInvalid ?? undefined)}
        aria-describedby=${this.helper ? this.helperId : nothing}
        @input=${this.handleTextareaInput}
      ></mm-textarea>
      ${renderFieldHelper(this.helper, this.helperId)}
    `
  }

  private get helperId() {
    return `${this.inputId}-helper`
  }

  private handleTextareaInput(event: CustomEvent<{ value: string }>) {
    this.value = event.detail.value
  }
}
