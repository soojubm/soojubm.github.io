import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { textfieldStyles } from './textfield.styles'

@customElement('mm-textarea')
class Textarea extends LitElement {
  @property({ type: String }) value = ''
  @property({ type: String }) name = ''
  @property({ type: String }) placeholder = ''
  @property({ type: String }) label = ''
  @property({ type: String }) helper = ''
  @property({ type: Boolean, attribute: 'isOptional' }) isOptional = false
  @property({ type: Boolean, attribute: 'hiddenLabel' }) hiddenLabel = false
  @property({ type: Boolean, reflect: true }) disabled = false
  @property({ type: Boolean, attribute: 'aria-invalid' }) isInvalid = false

  static styles = [textfieldStyles]

  render() {
    return html`
      <div
        class="textfield ${this.isInvalid ? 'is-invalid' : ''}"
        data-label="${String(this.hiddenLabel)}"
      >
        ${this.label
          ? html`
              <label class="textfield-label">
                ${this.label} ${this.isOptional ? html`<small>선택입력</small>` : ''}
              </label>
            `
          : ''}

        <textarea
          class="reset-input textfield-input"
          rows="3"
          .value="${this.value}"
          name="${this.name}"
          placeholder="${this.placeholder}"
          ?disabled="${this.disabled}"
          aria-invalid="${this.isInvalid ? 'true' : 'false'}"
        ></textarea>

        ${this.helper ? html`<p class="textfield-helper">${this.helper}</p>` : ''}
      </div>
    `
  }
}

export default Textarea
