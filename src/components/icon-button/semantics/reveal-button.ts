import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { iconButtonStyles } from '../../button/icon-button.styles'

/**
 * 비밀번호 등 가려진 입력값의 노출 여부를 토글하는 버튼.
 * revealed 상태에 따라 eye / eye-closed 아이콘으로 전환됩니다.
 */
@customElement('mm-reveal-button')
export class RevealButton extends LitElement {
  /** 노출 상태 (true: 보임) */
  @property({ type: Boolean, reflect: true }) revealed = false
  @property({ type: Boolean, reflect: true }) disabled = false

  static styles = [iconButtonStyles]

  private handleClick() {
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

  render() {
    return html`
      <button
        type="button"
        class="icon-button"
        data-variant="plain"
        aria-pressed=${this.revealed ? 'true' : 'false'}
        aria-label=${this.revealed ? '비밀번호 숨기기' : '비밀번호 보기'}
        ?disabled=${this.disabled}
        @click=${this.handleClick}
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
