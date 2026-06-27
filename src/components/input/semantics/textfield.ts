import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { AriaInvalid } from '@/types/aria'
import { textfieldStyles } from '@/components/input/semantics/textfield.styles'
import '@/components/input/input'
import { emit } from '@/utils/emit'
import { uniqueId } from '@/utils/unique-id'

@customElement('mm-textfield')
export class Textfield extends LitElement {
  static styles = textfieldStyles

  @property({ type: String }) type = 'text'
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

  private inputId = uniqueId('input')

  private handleInput(event: Event) {
    const target = event.target as HTMLInputElement
    this.value = target.value
    emit(this, 'input', { value: this.value })
  }

  render() {
    return html`
      <div class="textfield" ?data-invalid=${this.ariaInvalid === 'true'}>
        ${this.label
          ? html`
              <mm-textfield-label for=${this.inputId} ?optional=${this.optional}>
                ${this.label}
              </mm-textfield-label>
            `
          : nothing}
        ${this.helper
          ? html`
              <mm-textfield-helper>${this.helper}</mm-textfield-helper>
            `
          : nothing}
        <slot name="link"></slot>
        <div class="textfield-control">
          <slot name="leading"></slot>
          <mm-input
            input-id=${this.inputId}
            .type=${this.type}
            .value=${this.value}
            .name=${this.name}
            .placeholder=${this.placeholder}
            aria-label=${this.label ?? this.placeholder ?? nothing}
            ?disabled=${this.disabled}
            aria-invalid=${this.ariaInvalid ?? nothing}
            aria-describedby=${this.validationText ? `${this.inputId}-validation` : nothing}
            @input=${this.handleInput}
          ></mm-input>
          <slot name="trailing"></slot>
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
}

export default Textfield
