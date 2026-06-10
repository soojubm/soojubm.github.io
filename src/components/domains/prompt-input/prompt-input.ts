import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { PromptInputTextarea } from './prompt-input-textarea'

@customElement('mm-prompt-input')
export class PromptInput extends LitElement {
  @property({ type: String, reflect: true }) value = ''
  @property({ type: Boolean, attribute: 'is-loading', reflect: true }) isLoading = false

  static styles = [
    css`
      :host {
        display: block;
      }
    `,
  ]

  constructor() {
    super()
    // 자식(Textarea)으로부터 올라오는 이벤트를 수신하여 상태 동기화
    this.addEventListener('prompt-textarea-input', this._handleTextareaInput as EventListener)
    this.addEventListener('prompt-textarea-submit', this._handleTextareaSubmit as EventListener)
  }

  protected updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('value')) {
      this._syncTextareaValue()
    }
  }

  private get _textarea() {
    return Array.from(this.children).find(element => element instanceof PromptInputTextarea) as
      | PromptInputTextarea
      | undefined
  }

  private _syncTextareaValue() {
    const textarea = this._textarea
    if (!textarea || textarea.value === this.value) return
    textarea.value = this.value
  }

  private _handleSlotChange() {
    this._syncTextareaValue()
  }

  private _handleTextareaInput(e: CustomEvent) {
    this.value = e.detail.value
    // 부모 컴포넌트(React/Vue 등 외부 환경)로 value 변경 알림
    this.dispatchEvent(new CustomEvent('value-change', { detail: { value: this.value } }))
  }

  private _handleTextareaSubmit(e: Event) {
    e.stopPropagation() // 내부 이벤트 캡처 후 커스텀 submit 발행
    if (!this.isLoading && this.value.trim()) {
      this.dispatchEvent(new CustomEvent('submit', { detail: { value: this.value } }))
    }
  }

  render() {
    return html`<slot @slotchange=${this._handleSlotChange}></slot>`
  }
}
