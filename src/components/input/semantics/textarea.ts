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
  @property({ type: Boolean, attribute: 'hidden-label', reflect: true }) hiddenLabel = false
  @property({ type: Boolean, reflect: true }) disabled = false
  @property({ type: Boolean, attribute: 'aria-invalid', reflect: true }) isInvalid = false

  @state() protected _textareaId = `mm-textarea-${uniqueIdCounter++}`

  static styles = [
    inputStyles,
    css`
      .textfield {
        position: relative;
      }

      /* 라벨을 시각적으로만 감추고 스크린리더에는 남김 (for 연결 유지) */
      :host([hidden-label]) mm-textfield-label {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
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
      <div class="textfield-control">
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
      </div>
    `
  }

  render() {
    return html`
      <div class="textfield" ?data-invalid="${this.isInvalid}">
        ${this.label
          ? html`<mm-textfield-label for="${this._textareaId}" ?optional=${this.isOptional}>
              ${this.label}
            </mm-textfield-label>`
          : ''}
        ${this.renderTextarea()}
        ${this.helper
          ? html`<mm-textfield-helper id="${this._textareaId}-helper"
              >${this.helper}</mm-textfield-helper
            >`
          : ''}
      </div>
    `
  }
}
