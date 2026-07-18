import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import {
  buttonBaseStyles,
  followButtonStyles,
  buttonSelectedStyles,
} from '@/components/button/button.styles'
import { withToggleSelection } from '@/components/button/button.utils'

@customElement('mm-follow-button')
export class FollowButton extends withToggleSelection(LitElement) {
  static styles = [buttonBaseStyles, followButtonStyles, buttonSelectedStyles]

  render() {
    return html`
      <button
        type="button"
        ?disabled=${this.disabled}
        aria-pressed=${this.selected ? 'true' : 'false'}
        @click=${this.handleToggle}
      >
        ${this.selected ? '팔로우 중' : '팔로우'}
      </button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-follow-button': FollowButton
  }
}
