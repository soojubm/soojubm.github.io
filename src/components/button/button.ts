import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { buttonStyles } from './button.styles' // 👈 분리한 스타일 파일 불러오기

@customElement('mm-button')
export class Button extends LitElement {
  // 1. 상태(Property) 정의: 기존의 getter와 attributeChangedCallback을 완벽히 대체합니다.
  @property({ type: String }) variant = 'tertiary'
  @property({ type: String }) size = 'medium'
  @property({ type: String }) status = ''
  // 문자열 'true'/'false' 대신 깔끔하게 Boolean 타입으로 처리합니다.
  @property({ type: Boolean }) isFullWidth = false
  // reflect: true를 주면 JS 프로퍼티 변경 시 HTML 속성(attribute)에도 자동 반영됩니다.
  @property({ type: Boolean, reflect: true }) disabled = false
  @property({ type: String }) icon = ''

  // 2. 스타일: 기존 makeStyleSheet('button')을 대체합니다.
  static styles = [buttonStyles]

  // 💡 이벤트 핸들러 함수 정의
  private _handleClick(event: Event) {
    if (this.disabled) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  // 3. 렌더링: connectedCallback과 복잡한 DOM 생성 로직을 모두 대체합니다.
  render() {
    return html`
      <button
        class="button"
        data-variant="${this.variant}"
        data-size="${this.size}"
        data-status="${this.status}"
        data-isfullwidth="${this.isFullWidth}"
        ?disabled="${this.disabled}"
        aria-selected="${this.status === 'active' ? 'true' : 'false'}"
        aria-checked="${this.status === 'checked' ? 'true' : 'false'}"
        @click="${this._handleClick}"
      >
        ${this.icon ? html`<mm-icon name="${this.icon}"></mm-icon>` : ''}

        <label class="button-label">
          <slot></slot>
        </label>
      </button>
    `
  }
}

export default Button
