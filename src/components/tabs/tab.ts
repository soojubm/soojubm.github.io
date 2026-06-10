import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('mm-tab')
export default class Tab extends LitElement {
  @property({ type: String }) value = ''
  @property({ type: Boolean, reflect: true }) active = false

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('click', this.handleClick)
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.handleClick)
    super.disconnectedCallback()
  }

  static styles = css`
    :host {
      position: relative;
      display: inline-flex;
      z-index: 1; /* pill indicator 위에 텍스트가 렌더링되도록 stacking context 생성 */
    }

    [role='tab'] {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: var(--size-medium);
      padding: 0 var(--space-3);
      font-size: 14px;
      color: #8e8e93;
      cursor: pointer;
      user-select: none;
      transition: color 0.25s ease, font-weight 0.25s ease;
    }

    [role='tab'][aria-selected='true'] {
      color: var(--color-primary);
    }

    /* 부모 탭리스트가 pill 형태일 때 활성화된 글자 색상을 커스텀하고 싶다면 하단 주석 해제 */
    /* :host-context(mm-tab-list[variant="pill"])[active] { color: var(--color-primary); } */
  `

  private handleClick = () => {
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
      <div role="tab" aria-selected="${this.active}">
        <slot></slot>
      </div>
    `
  }
}
