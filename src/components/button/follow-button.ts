import { html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { ToggleButton } from './toggle-button'

/**
 * 팔로우 토글 버튼. ToggleButton을 확장합니다.
 * 선택(팔로잉) 상태에 따라 레이블과 아이콘이 전환됩니다.
 */
@customElement('mm-follow-button')
export class FollowButton extends ToggleButton {
  override render() {
    return html`
      <button
        type="button"
        class="toggle"
        role="button"
        aria-pressed=${this.selected ? 'true' : 'false'}
        ?disabled=${this.disabled}
        @click=${this.handleClick}
      >
        <mm-icon name=${this.selected ? 'check' : 'plus'}></mm-icon>
        ${this.selected ? '팔로잉' : '팔로우'}
      </button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-follow-button': FollowButton
  }
}
