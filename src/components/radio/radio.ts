import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { radioStyles } from './radio.styles'

@customElement('mm-radio')
export class Radio extends LitElement {
  // 인스턴스 전역 내장 프로퍼티인 id 오버라이드 데코레이터 제거
  @property({ type: String }) name = ''
  @property({ type: String }) value = ''
  @property({ type: Boolean, reflect: true }) checked = false
  @property({ type: Boolean, reflect: true }) disabled = false

  static styles = [radioStyles]

  // 인스턴스 생성 시 단 한 번만 고유 ID 발급
  private _uniqueId = `radio-${crypto.randomUUID()}`

  private _onChange(event: Event) {
    event.stopPropagation() // 네이티브 이벤트 전파 차단

    this.checked = (event.target as HTMLInputElement).checked

    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { checked: this.checked, value: this.value },
      }),
    )
  }

  render() {
    // 외부에서 지정한 id가 있으면 쓰고, 없으면 자동 생성된 고유 ID 사용
    const inputId = this.id || this._uniqueId

    return html`
      <div>
        <input
          type="radio"
          id=${inputId}
          name=${this.name || nothing}
          .value=${this.value || ''}
          .checked=${this.checked}
          ?disabled=${this.disabled}
          @change=${this._onChange}
        />
        <label for=${inputId}>
          <span></span>
          <span><slot></slot></span>
        </label>
      </div>
    `
  }
}

export default Radio
