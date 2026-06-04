import { LitElement, html, css } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { inputStyles } from '../../input/input.styles'

@customElement('mm-prompt-input-textarea')
export class PromptInputTextarea extends LitElement {
  @property({ type: String }) placeholder = 'Ask me anything...'
  @property({ type: String }) value = ''
  @property({ type: String }) name = ''

  @query('textarea') private _textarea!: HTMLTextAreaElement

  static styles = [
    inputStyles,
    css`
      :host {
        display: block;
        width: 100%;
      }
    `,
  ]

  // 외부에서 value를 직접 바꿨을 때도 높이를 재계산하도록 유도
  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('value')) {
      this._autoResize()
    }
  }

  private _autoResize() {
    if (!this._textarea) return
    this._textarea.style.height = 'auto'
    this._textarea.style.height = `${this._textarea.scrollHeight}px`
  }

  private _onInput(e: InputEvent) {
    const target = e.target as HTMLTextAreaElement
    this.value = target.value
    this._autoResize()

    // 루트(PromptInput) 컴포넌트가 감지할 수 있도록 버블링 이벤트 전송
    this.dispatchEvent(
      new CustomEvent('prompt-textarea-input', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    )
  }

  private _onKeyDown(e: KeyboardEvent) {
    if (e.isComposing) return // IME 한글 중복 입력 방지

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      this.dispatchEvent(
        new CustomEvent('prompt-textarea-submit', {
          bubbles: true,
          composed: true,
        }),
      )
    }
  }

  render() {
    return html`
      <textarea
        .value="${this.value}"
        name="${this.name}"
        placeholder="${this.placeholder}"
        rows="1"
        @input="${this._onInput}"
        @keydown="${this._onKeyDown}"
      ></textarea>
    `
  }
}
