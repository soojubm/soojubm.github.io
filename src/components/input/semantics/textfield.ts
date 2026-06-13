import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { textfieldStyles } from './textfield.styles'
import '../input'

@customElement('mm-textfield')
export class Textfield extends LitElement {
  @property({ type: String }) type = 'text'
  @property({ type: String }) value = ''
  @property({ type: String }) name?: string
  @property({ type: String }) placeholder?: string
  @property({ type: String }) label?: string
  @property({ type: String }) helper?: string
  @property({ type: String, attribute: 'validation-text' }) validationText?: string
  @property({ type: String, reflect: true }) size = ''

  @property({ type: Boolean, attribute: 'is-optional' }) isOptional = false
  @property({ type: Boolean, attribute: 'hidden-label', reflect: true }) hiddenLabel = false
  @property({ type: Boolean, reflect: true }) disabled = false
  @property({ type: Boolean, attribute: 'aria-invalid' }) isInvalid = false

  static styles = textfieldStyles

  private inputId = `input-${crypto?.randomUUID?.() || Math.random().toString(36).slice(2)}`

  private _handleInput(event: Event) {
    const target = event.target as HTMLInputElement
    this.value = target.value
    this.dispatchEvent(
      new CustomEvent('input', { bubbles: true, composed: true, detail: { value: this.value } }),
    )
  }

  render() {
    return html`
      <div class="textfield" ?data-invalid=${this.isInvalid}>
        ${this.label
          ? html`
              <mm-textfield-label for=${this.inputId} ?optional=${this.isOptional}>
                ${this.label}
              </mm-textfield-label>
            `
          : nothing}
        ${this.helper
          ? html`
              <div style="margin-top:-.25rem">
                <mm-textfield-helper>${this.helper}</mm-textfield-helper>
              </div>
            `
          : nothing}
        <div class="textfield-control">
          <slot name="leading"></slot>
          <mm-input
            input-id=${this.inputId}
            input-class="textfield-input"
            .type=${this.type}
            .value=${this.value}
            .name=${this.name}
            .placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            ?invalid=${this.isInvalid}
            .describedBy=${this.validationText ? `${this.inputId}-validation` : undefined}
            @input=${this._handleInput}
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
