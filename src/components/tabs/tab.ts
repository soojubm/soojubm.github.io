import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('mm-tab')
export default class Tab extends LitElement {
  @property({ type: String }) value = ''
  @property({ type: Boolean, reflect: true }) active = false

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 10px 18px;
      font-size: 14px;
      color: #8e8e93;
      cursor: pointer;
      user-select: none;
      transition: color 0.25s ease, font-weight 0.25s ease;
      z-index: 1; /* pill 스타일 인디케이터 배경보다 위에 오도록 설정 */
    }

    :host([active]) {
      color: #007aff;
      font-weight: 600;
    }

    /* 부모 탭리스트가 pill 형태일 때 활성화된 글자 색상을 커스텀하고 싶다면 하단 주석 해제 */
    /* :host-context(mm-tab-list[variant="pill"])[active] { color: #000000; } */
  `

  private _handleClick() {
    // 탭 선택 이벤트를 생성하여 상위 mm-tabs까지 올라가도록 설정(bubbles, composed)
    this.dispatchEvent(
      new CustomEvent('tab-select', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    )
  }

  render() {
    return html`
      <div @click="${this._handleClick}" role="tab" aria-selected="${this.active}">
        <slot></slot>
      </div>
    `
  }
}
