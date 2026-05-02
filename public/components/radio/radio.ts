import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { radioStyles } from './radio.styles'

@customElement('mm-radio')
export class Radio extends LitElement {
  // 선택적(Optional) 속성은 타입스크립트의 ? 문법을 사용합니다.
  @property({ type: String }) override id: string = ''
  @property({ type: String }) name?: string
  @property({ type: String }) helper?: string
  @property({ type: String }) value?: string
  @property({ type: Boolean, reflect: true }) checked = false
  @property({ type: Boolean, reflect: true }) disabled = false

  static styles = [radioStyles]

  // 렌더링마다 ID가 변경되는 것을 막기 위해 인스턴스 생성 시 고유 ID를 한 번만 할당합니다.
  private _defaultId = `radio-${crypto.randomUUID()}`

  // 사용자가 외부에서 id를 주입하면 그것을 사용하고, 없다면 자동 생성된 ID를 사용합니다.
  private get _inputId() {
    return this.id || this._defaultId
  }

  // 라디오 버튼 선택 시 내부 상태를 업데이트하고 이벤트를 상위로 전달합니다.
  private _onChange(event: Event) {
    const target = event.target as HTMLInputElement
    this.checked = target.checked

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
      <div>
        <input
          type="radio"
          id=${this._inputId}
          name=${this.name || nothing}
          .value=${this.value || nothing}
          .checked=${this.checked}
          ?disabled=${this.disabled}
          @change=${this._onChange}
        />
        <label for=${this._inputId}>
          <span></span>
          <span><slot></slot></span>
        </label>
        ${this.helper ? html`<p>${this.helper}</p>` : nothing}
      </div>
    `
  }
}

export default Radio
