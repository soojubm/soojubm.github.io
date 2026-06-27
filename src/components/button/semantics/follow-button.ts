import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import {
  buttonBaseStyles,
  followButtonStyles,
  buttonSelectedStyles,
} from '@/components/button/button.styles'
import { toggleSelection } from '@/components/button/button.utils'

@customElement('mm-follow-button')
export class FollowButton extends LitElement {
  static styles = [buttonBaseStyles, followButtonStyles, buttonSelectedStyles]

  @property({ type: Boolean, reflect: true }) selected = false
  @property({ type: String }) value = ''
  @property({ type: Boolean }) disabled = false

  private handleClick() {
    toggleSelection(this)
  }

  render() {
    return html`
      <button
        type="button"
        ?disabled=${this.disabled}
        aria-pressed=${String(this.selected)}
        @click=${this.handleClick}
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
