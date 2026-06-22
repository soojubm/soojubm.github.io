import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('mm-tab')
export default class Tab extends LitElement {
  @property({ type: String }) value = ''
  @property({ type: Boolean, reflect: true }) active = false

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'tab')
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

    .tab-content {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: var(--size-medium);
      padding: 0 var(--space-3);
      font-size: 14px;
      color: var(--color-foreground-light);
      cursor: pointer;
      user-select: none;
      transition: color 0.25s ease, font-weight 0.25s ease;
    }

    :host([aria-selected='true']) .tab-content {
      color: var(--selection-foreground);
    }

    :host(:focus-visible) {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }

    /* 부모 탭리스트가 pill 형태일 때 활성화된 글자 색상을 커스텀하고 싶다면 하단 주석 해제 */
    /* :host-context(mm-tab-list[variant="pill"])[active] { color: var(--selection-foreground); } */
  `

  public select() {
    this.dispatchEvent(
      new CustomEvent('tab-select', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    )
  }

  private handleClick = () => {
    this.focus()
    this.select()
  }

  protected updated(changedProperties: Map<string, unknown>) {
    if (!changedProperties.has('active')) return

    this.setAttribute('aria-selected', String(this.active))
    this.tabIndex = this.active ? 0 : -1
  }

  render() {
    return html`
      <div class="tab-content">
        <slot></slot>
      </div>
    `
  }
}
