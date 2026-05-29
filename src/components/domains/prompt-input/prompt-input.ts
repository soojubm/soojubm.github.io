import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('mm-prompt-input')
export class PromptInput extends LitElement {
  @property({ type: String, reflect: true }) value = ''
  @property({ type: Boolean, attribute: 'is-loading', reflect: true }) isLoading = false

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      border: 1px solid #e4e4e7; /* 자일리톨 스타일의 연한 테두리 */
      border-radius: 12px;
      padding: 12px;
      background-color: #ffffff;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    :host(:focus-within) {
      border-color: #09090b; /* 포커스 시 다크 테두리 */
      box-shadow: 0 0 0 1px #09090b;
    }
  `

  constructor() {
    super()
    // 자식(Textarea)으로부터 올라오는 이벤트를 수신하여 상태 동기화
    this.addEventListener('prompt-textarea-input', this._handleTextareaInput as EventListener)
    this.addEventListener('prompt-textarea-submit', this._handleTextareaSubmit as EventListener)
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
    return html`<slot></slot>` // 하위 요소들이 자유롭게 배치될 공간
  }
}
