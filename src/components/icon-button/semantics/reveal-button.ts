import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { iconButtonStyles } from '../icon-button.styles'
import { ICON_NAMES } from './icon-names'
import { emit } from '../../../utils/emit'

/**
 * 비밀번호 등 가려진 입력값의 노출 여부를 토글하는 버튼.
 * revealed 상태에 따라 eye / eye-closed 아이콘으로 전환됩니다.
 */
@customElement('mm-reveal-button')
export class RevealButton extends LitElement {
  static styles = [iconButtonStyles]

  @property({ type: Boolean }) revealed = false
  @property({ type: Boolean }) disabled = false

  private _handleClick = () => {
    if (this.disabled) return
    this.revealed = !this.revealed
    emit(this, 'reveal-toggle', { revealed: this.revealed })
  }

  render() {
    return html`
      <button
        type="button"
        aria-pressed=${String(this.revealed)}
        aria-label=${this.revealed ? '비밀번호 숨기기' : '비밀번호 보기'}
        ?disabled=${this.disabled}
        @click=${this._handleClick}
      >
        <mm-icon name=${this.revealed ? ICON_NAMES.HIDE : ICON_NAMES.REVEAL}></mm-icon>
      </button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-reveal-button': RevealButton
  }
}
