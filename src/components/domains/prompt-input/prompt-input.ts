import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { textfieldStyles } from '../../input/semantics/textfield.styles'

@customElement('mm-prompt-input')
export class PromptInput extends LitElement {
  @property({ type: String, reflect: true }) value = ''
  @property({ type: Boolean, attribute: 'is-loading', reflect: true }) isLoading = false

  static styles = [
    ...textfieldStyles,
    css`
      :host {
        --prompt-input-border-color: var(--color-border, #e4e4e7);
        --prompt-input-border-color-focus: var(--color-foreground, #09090b);
        --prompt-input-radius: 12px;
        --prompt-input-padding: 12px;
        --prompt-input-background: var(--color-background);
      }

      .textfield-control {
        flex-direction: column;
        align-items: stretch;
      }
    `,
  ]

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
    return html`<div class="textfield-control"><slot></slot></div>` // 하위 요소들이 자유롭게 배치될 공간
  }
}
