import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { AriaInvalid } from '@/types/aria'
import { textfieldStyles } from '@/components/input/semantics/textfield.styles'
import '@/components/input/textarea'
import { uniqueId } from '@/utils/unique-id'

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
  private get helperId() {
    return `${this.inputId}-helper`
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
        <mm-textarea
          input-id=${this.inputId}
          .value=${this.value}
          .name=${this.name}
          .placeholder=${this.placeholder}
          .rows=${this.rows}
          ?disabled=${this.disabled}
          aria-invalid=${this.ariaInvalid ?? nothing}
          aria-describedby=${this.helper ? this.helperId : nothing}
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
