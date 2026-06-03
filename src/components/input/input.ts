import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

/**
 * <mm-input>
 * 공용 input 요소 컴포넌트. textfield 및 파생 컴포넌트(number-input 등)가 공유한다.
 * 라벨/헬퍼/검증/슬롯은 textfield가 담당하고, 이 컴포넌트는 순수 input 요소만 렌더한다.
 *
 * shadow DOM이 아닌 light DOM에 렌더하여 호스트(textfield)의 input 스타일과
 * `.textfield-control:focus-within` 같은 선택자가 그대로 적용되도록 한다.
 */
@customElement('mm-input')
export class Input extends LitElement {
  @property({ attribute: 'input-id' }) inputId = ''
  @property({ attribute: 'input-class' }) inputClass = ''
  @property() type = 'text'
  @property() value = ''
  @property() name?: string
  @property() placeholder?: string
  @property({ type: Boolean }) disabled = false
  @property({ type: Boolean }) invalid = false
  @property({ attribute: 'described-by' }) describedBy?: string
  @property({ type: Number }) min?: number
  @property({ type: Number }) max?: number
  @property({ type: Number }) step?: number

  // light DOM 렌더: 내부 <input>이 textfield의 shadow tree에 위치하여 스타일이 적용된다.
  protected override createRenderRoot() {
    return this
  }

  private handleInput(event: Event) {
    const target = event.target as HTMLInputElement
    this.value = target.value
    event.stopPropagation()
    this.dispatchEvent(new Event('input', { bubbles: true, composed: true }))
  }

  override render() {
    return html`
      <input
        id=${this.inputId || nothing}
        class=${this.inputClass || nothing}
        type=${this.type}
        .value=${this.value}
        name=${this.name || nothing}
        placeholder=${this.placeholder || nothing}
        min=${this.min ?? nothing}
        max=${this.max ?? nothing}
        step=${this.step ?? nothing}
        ?disabled=${this.disabled}
        aria-invalid=${this.invalid ? 'true' : 'false'}
        aria-describedby=${this.describedBy || nothing}
        @input=${this.handleInput}
      />
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-input': Input
  }
}

export default Input
