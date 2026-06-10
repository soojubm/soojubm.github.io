import { html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { textfieldStyles } from './textfield.styles'
import { Textarea } from '../textarea'

@customElement('mm-textarea-field')
export class TextareaField extends Textarea {
  @property({ type: String }) label = ''
  @property({ type: String }) helper = ''
  @property({ type: Boolean, attribute: 'is-optional' }) isOptional = false

  static styles = textfieldStyles

  protected get helperId() {
    return `${this.textareaId}-helper`
  }

  protected override get textareaDescribedBy() {
    return this.helper ? this.helperId : this.describedBy
  }

  protected renderLabel(): unknown {
    if (!this.label) return nothing

    return html`
      <mm-textfield-label for=${this.textareaId} ?optional=${this.isOptional}>
        ${this.label}
      </mm-textfield-label>
    `
  }

  protected renderHelper(): unknown {
    return this.helper
      ? html`<mm-textfield-helper id=${this.helperId}>${this.helper}</mm-textfield-helper>`
      : nothing
  }

  render() {
    return html`
      <div class="textfield" ?data-invalid=${this.isInvalid}>
        ${this.renderLabel()} ${this.renderTextarea()} ${this.renderHelper()}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-textarea-field': TextareaField
  }
}

export default TextareaField
