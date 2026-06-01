import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { inputStyles } from '../input.styles'

let uniqueIdCounter = 0

@customElement('mm-textarea')
export class Textarea extends LitElement {
  @property({ type: String }) value = ''
  @property({ type: String }) name = ''
  @property({ type: String }) placeholder = ''
  @property({ type: String }) label = ''
  @property({ type: String }) helper = ''
  @property({ type: Boolean, attribute: 'is-optional' }) isOptional = false
  @property({ type: Boolean, attribute: 'hidden-label' }) hiddenLabel = false
  @property({ type: Boolean, reflect: true }) disabled = false
  @property({ type: Boolean, attribute: 'aria-invalid', reflect: true }) isInvalid = false

  @state() protected _textareaId = `mm-textarea-${uniqueIdCounter++}`

  static styles = [
    inputStyles,
    css`
      p {
        margin: 0;
      }

      label {
        display: block;
        line-height: var(--size-small);
      }

      label small {
        margin: 0 0 0 var(--space-1);
        color: var(--color-foreground-light);
      }

      .textfield {
        position: relative;
      }
    `,
  ]

  protected get textareaClasses() {
    return 'reset-input textfield-input'
  }

  protected get textareaRows() {
    return 3
  }

  protected _onInput(event: InputEvent) {
    const target = event.target as HTMLTextAreaElement
    this.value = target.value
    this._dispatchInputEvent(target.value)
  }

  protected _onKeyDown(_event: KeyboardEvent) {}

  private _dispatchInputEvent(value: string) {
    this.dispatchEvent(
      new CustomEvent('input', {
        detail: { value },
        bubbles: true,
        composed: true,
      }),
    )
  }

  protected renderTextarea() {
    const helperId = `${this._textareaId}-helper`
    return html`
      <textarea
        id="${this._textareaId}"
        rows="${this.textareaRows}"
        .value="${this.value}"
        name="${this.name}"
        placeholder="${this.placeholder}"
        ?disabled="${this.disabled}"
        aria-invalid="${this.isInvalid ? 'true' : 'false'}"
        aria-describedby="${this.helper ? helperId : ''}"
        @input="${this._onInput}"
        @keydown="${this._onKeyDown}"
      ></textarea>
    `
  }

  render() {
    return html`
      <div class="textfield" ?data-invalid="${this.isInvalid}" data-label="${this.hiddenLabel}">
        ${this.label
          ? html`<label for="${this._textareaId}">
              ${this.label}${this.isOptional ? html`<small>선택입력</small>` : ''}
            </label>`
          : ''}
        ${this.renderTextarea()}
        ${this.helper
          ? html`<mm-text size="12" id="${this._textareaId}-helper">${this.helper}</mm-text>`
          : ''}
      </div>
    `
  }
}
