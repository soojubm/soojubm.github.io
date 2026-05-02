import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { checkboxStyles } from './checkbox.styles'

@customElement('mm-checkbox')
export class Checkbox extends LitElement {
  @property({ type: String }) name?: string
  @property({ type: String }) size?: string
  @property({ type: String }) helper?: string
  @property({ type: String }) value?: string
  @property({ type: Boolean, reflect: true }) checked = false
  @property({ type: Boolean, reflect: true }) disabled = false
  @property({ type: Boolean, reflect: true }) indeterminate = false

  static styles = [checkboxStyles]

  // 고유 ID 생성: 여러 체크박스가 같은 name을 가질 때 label의 for 속성이 꼬이는 것을 방지
  private inputId = `checkbox-${crypto.randomUUID()}`

  private _onChange(event: Event) {
    const target = event.target as HTMLInputElement
    this.checked = target.checked

    // 사용자가 직접 클릭하면 indeterminate 상태는 해제되는 것이 브라우저 기본 동작입니다.
    this.indeterminate = false

    // 상위 컴포넌트에서 쉽게 값을 사용할 수 있도록 detail 객체에 상태를 담아 발송
    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { checked: this.checked, value: this.value },
      }),
    )
  }

  render() {
    return html`
      <div data-size=${this.size || nothing}>
        <input
          type="checkbox"
          id=${this.inputId}
          name=${this.name || nothing}
          .value=${this.value || nothing}
          .checked=${this.checked}
          .indeterminate=${this.indeterminate}
          ?disabled=${this.disabled}
          @change=${this._onChange}
        />
        <label for=${this.inputId}>
          <span></span>
          <mm-text variant="body"><slot></slot></mm-text>
        </label>
        ${this.helper ? html`<p>${this.helper}</p>` : nothing}
      </div>
    `
  }
}

export default Checkbox
