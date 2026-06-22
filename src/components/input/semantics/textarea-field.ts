import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { textfieldStyles } from './textfield.styles'
import '../textarea'

@customElement('mm-textarea-field')
export class TextareaField extends LitElement {
  @property({ type: String }) value = ''
  @property({ type: String }) name = ''
  @property({ type: String }) placeholder = ''
  @property({ type: String }) label = ''
  @property({ type: String }) helper = ''
  @property({ type: Number }) rows = 3
  @property({ type: Boolean }) optional = false
  @property({ type: Boolean, reflect: true }) disabled = false
  @property({ type: Boolean, attribute: 'aria-invalid', reflect: true }) isInvalid = false

  static styles = textfieldStyles

  private inputId = `mm-textarea-${crypto?.randomUUID?.() || Math.random().toString(36).slice(2)}`
  private get helperId() {
    return `${this.inputId}-helper`
  }

  render() {
    return html`
      <div class="textfield" ?data-invalid=${this.isInvalid}>
        ${this.label
          ? html`
              <mm-textfield-label for=${this.inputId} ?optional=${this.optional}>
                ${this.label}
              </mm-textfield-label>
            `
          : nothing}
        <mm-textarea
          input-id=${this.inputId}
          .value=${this.value}
          .name=${this.name}
          .placeholder=${this.placeholder}
          .rows=${this.rows}
          ?disabled=${this.disabled}
          .isInvalid=${this.isInvalid}
          .describedBy=${this.helper ? this.helperId : ''}
          @input=${this._syncValue}
        ></mm-textarea>
        ${this.helper
          ? html`
              <mm-textfield-helper id=${this.helperId}>${this.helper}</mm-textfield-helper>
            `
          : nothing}
      </div>
    `
  }

  private _syncValue(event: CustomEvent<{ value: string }>) {
    this.value = event.detail.value
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-textarea-field': TextareaField
  }
}

export default TextareaField
