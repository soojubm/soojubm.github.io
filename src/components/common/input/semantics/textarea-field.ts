import { LitElement, html, nothing } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { AriaInvalid } from '@/types'

import { textfieldStyles } from '@/components/common/input/input.styles'
import {
  renderFieldDescription,
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
  @property({ type: String }) description?: string
  @property({ type: Number }) rows = 2
  @property({ type: Boolean }) optional = false
  @property({ type: Boolean }) disabled = false
  @property({ type: String, attribute: 'aria-invalid' }) ariaInvalid: AriaInvalid = null
  @query('mm-textarea') private textarea?: HTMLElement
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
        aria-describedby=${this.description ? this.descriptionId : nothing}
        @input=${this.handleTextareaInput}
      >
        <slot name="leading" slot="leading"></slot>
        <slot name="trailing" slot="trailing"></slot>
      </mm-textarea>
      ${renderFieldDescription(this.description, this.descriptionId)}
    `
  }

  // 호스트는 포커스를 받지 않으므로 mm-textarea로 넘긴다.
  focus(options?: FocusOptions) {
    this.textarea?.focus(options)
  }

  private get descriptionId() {
    return `${this.inputId}-description`
  }

  private handleTextareaInput(event: CustomEvent<{ value: string }>) {
    this.value = event.detail.value
  }
}
