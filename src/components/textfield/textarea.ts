// textarea.ts (부모 컴포넌트)
import { LitElement, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { textfieldStyles } from './textfield.styles'

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

  static styles = [textfieldStyles]

  // 👇 자식이 오버라이드할 수 있도록 Getter와 메서드로 분리
  protected get textareaClasses() {
    return 'reset-input textfield-input'
  }

  protected get textareaRows() {
    return 3 // 기본 textarea는 3줄
  }

  protected _onInput(event: InputEvent) {
    const target = event.target as HTMLTextAreaElement
    this.value = target.value
    this._dispatchInputEvent(target.value)
  }

  protected _onKeyDown(event: KeyboardEvent) {
    // 기본 컴포넌트에서는 엔터키 특수 기능 없음 (기본 개행)
  }

  private _dispatchInputEvent(value: string) {
    this.dispatchEvent(
      new CustomEvent('input', {
        detail: { value },
        bubbles: true,
        composed: true,
      }),
    )
  }

  // 👇 핵심: <textarea> 마크업과 속성 바인딩을 자식과 공유하기 위해 메서드로 추출
  protected renderTextarea() {
    const helperId = `${this._textareaId}-helper`
    return html`
      <textarea
        id="${this._textareaId}"
        class="${this.textareaClasses}"
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
      <div class="textfield ${this.isInvalid ? 'is-invalid' : ''}" data-label="${this.hiddenLabel}">
        ${this.label
          ? html`<label class="textfield-label" for="${this._textareaId}"
              >${this.label}${this.isOptional ? html`<small>선택입력</small>` : ''}</label
            >`
          : ''}
        ${this.renderTextarea()}
        ${this.helper
          ? html`<mm-text size="12" id="${this._textareaId}-helper" class="textfield-helper">${this.helper}</mm-text>`
          : ''}
      </div>
    `
  }
}
