import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import {
  buttonBaseStyles,
  followButtonStyles,
  buttonSelectedStyles,
} from '@/components/common/button/button.styles'
import { withTogglePressed } from '@/components/common/button/button.utils'
import { resetStyles } from '@/stylesheets/shared.styles'

@customElement('mm-follow-button')
export class FollowButton extends withTogglePressed(LitElement) {
  static styles = [resetStyles, buttonBaseStyles, followButtonStyles, buttonSelectedStyles]

  render() {
    return html`
      <button
        type="button"
        ?disabled=${this.disabled}
        aria-pressed=${this.pressed ? 'true' : 'false'}
        @click=${this.handleToggleClick}
      >
        ${this.pressed ? '팔로우 중' : '팔로우'}
      </button>
    `
  }
}
