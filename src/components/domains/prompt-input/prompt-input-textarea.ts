import { LitElement, html, css } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { Textarea } from '../../input/semantics/textarea'

@customElement('mm-prompt-input-textarea')
export class PromptInputTextarea extends LitElement {
  @property({ type: String }) value = ''
  @property({ type: String }) name = ''
  @property({ type: String }) placeholder = 'Ask me anything...'
  @property({ type: Boolean, reflect: true }) disabled = false

  @query('mm-textarea') private _textarea!: Textarea

  static styles = css`
    :host {
      display: block;
      width: 100%;

      --input-height: auto;
      --input-background-color: transparent;
      --input-border: 0;
      --input-padding-block: 0;
      --input-padding-inline: 0;
    }

    mm-textarea {
      display: block;
      width: 100%;
    }
  `

  protected updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('value') && this._textarea?.value !== this.value) {
      this._textarea.value = this.value
    }
  }

  private _onInput(event: CustomEvent<{ value: string }>) {
    this.value = event.detail.value
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
      <mm-textarea
        .value=${this.value}
        name=${this.name}
        placeholder=${this.placeholder}
        rows=${1}
        ?disabled=${this.disabled}
        @input=${this._onInput}
        @keydown=${this._onKeyDown}
      ></mm-textarea>
    `
  }
}
