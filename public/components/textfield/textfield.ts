import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { textfieldStyles } from './textfield.styles'

@customElement('mm-textfield')
export class Textfield extends LitElement {
  @property({ type: String }) type = 'text'
  @property({ type: String }) value = ''
  @property({ type: String }) name?: string
  @property({ type: String }) placeholder?: string
  @property({ type: String }) label?: string
  @property({ type: String }) helper?: string

  @property({ type: Boolean, attribute: 'is-optional' }) isOptional = false
  @property({ type: Boolean, attribute: 'hidden-label' }) hiddenLabel = false
  @property({ type: Boolean, reflect: true }) disabled = false
  @property({ type: Boolean, attribute: 'aria-invalid' }) isInvalid = false

  static styles = [textfieldStyles]

  private inputId = `input-${crypto.randomUUID()}`

  private _handleInput(event: Event) {
    const target = event.target as HTMLInputElement
    this.value = target.value

    this.dispatchEvent(
      new CustomEvent('input', {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      }),
    )
  }

  render() {
    return html`
      <div ?data-invalid=${this.isInvalid} data-label=${this.hiddenLabel ? 'true' : 'false'}>
        ${this.label
          ? html`
              <label for=${this.inputId}>
                ${this.label} ${this.isOptional ? html`<small>선택입력</small>` : nothing}
              </label>
            `
          : nothing}

        <slot name="prefix"></slot>

        <input
          id=${this.inputId}
          type=${this.type}
          .value=${this.value}
          name=${this.name || nothing}
          placeholder=${this.placeholder || nothing}
          ?disabled=${this.disabled}
          aria-invalid=${this.isInvalid ? 'true' : 'false'}
          @input=${this._handleInput}
        />

        <slot name="suffix"></slot>
        <slot name="link"></slot>

        ${this.helper ? html`<p>${this.helper}</p>` : nothing}
      </div>
    `
  }
}

export default Textfield
