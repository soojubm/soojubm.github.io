import { LitElement, html, css } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { inputStyles } from '../input.styles'

let uniqueIdCounter = 0

@customElement('mm-textarea')
export class Textarea extends LitElement {
  @property({ type: String }) value = ''
  @property({ type: String }) name = ''
  @property({ type: String }) placeholder = ''
  @property({ type: String }) label = ''
  @property({ type: String }) helper = ''
  @property({ type: Number }) rows = 3
  @property({ type: Boolean, attribute: 'is-optional' }) isOptional = false
  @property({ type: Boolean, attribute: 'hidden-label', reflect: true }) hiddenLabel = false
  @property({ type: Boolean, reflect: true }) disabled = false
  @property({ type: Boolean, attribute: 'aria-invalid', reflect: true }) isInvalid = false

  @query('textarea') protected _textarea!: HTMLTextAreaElement

  @state() protected _textareaId = `mm-textarea-${uniqueIdCounter++}`

  protected get maxVisibleRows() {
    return 5
  }

  protected updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('value')) {
      this._autoResize()
    }
  }

  protected _autoResize() {
    if (!this._textarea) return
    const computedStyle = window.getComputedStyle(this._textarea)
    const fontSize = Number.parseFloat(computedStyle.fontSize)
    const lineHeight = Number.parseFloat(computedStyle.lineHeight) || fontSize * 1.2
    const paddingBlock =
      Number.parseFloat(computedStyle.paddingTop) + Number.parseFloat(computedStyle.paddingBottom)
    const maxHeight = lineHeight * this.maxVisibleRows + paddingBlock

    this._textarea.style.height = 'auto'
    const nextHeight = Math.min(this._textarea.scrollHeight, maxHeight)
    this._textarea.style.height = `${nextHeight}px`
    this._textarea.style.overflowY = this._textarea.scrollHeight > maxHeight ? 'auto' : 'hidden'
  }

  protected _onInput(event: InputEvent) {
    const target = event.target as HTMLTextAreaElement
    this.value = target.value
    this._autoResize()
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

  protected renderTextarea() {
    const helperId = `${this._textareaId}-helper`
    return html`
      <div class="textfield-control">
        <textarea
          id="${this._textareaId}"
          rows="${this.rows}"
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
