import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import IconButton from '../icon-button'

/**
 * 비밀번호 등 가려진 입력값의 노출 여부를 토글하는 버튼.
 * revealed 상태에 따라 eye / eye-closed 아이콘으로 전환됩니다.
 */
@customElement('mm-reveal-button')
export class RevealButton extends IconButton {
  @property({ type: Boolean, reflect: true }) revealed = false

  constructor() {
    super()
    this.variant = 'plain'
  }

  override connectedCallback() {
    super.connectedCallback()
    this.addEventListener('click', this._handleClick)
  }

  override disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener('click', this._handleClick)
  }

  private _handleClick = () => {
    if (this.disabled) return
    this.revealed = !this.revealed
    this.dispatchEvent(
      new CustomEvent('reveal-toggle', {
        detail: { revealed: this.revealed },
        bubbles: true,
        composed: true,
      }),
    )
  }

  protected override renderControl() {
    return html`
      <button
        slot="trigger"
        type="button"
        class="icon-button"
        data-variant="plain"
        aria-pressed=${this.revealed ? 'true' : 'false'}
        aria-label=${this.revealed ? '비밀번호 숨기기' : '비밀번호 보기'}
        ?disabled=${this.disabled}
      >
        <mm-icon name=${this.revealed ? 'eye-closed' : 'eye-solid'}></mm-icon>
      </button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-reveal-button': RevealButton
  }
}
