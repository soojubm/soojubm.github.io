import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import {
  buttonBaseStyles,
  followButtonStyles,
  buttonSelectedStyles,
} from '@/components/button/button.styles'
import { ToggleController } from '@/controllers/toggle-controller'
import { emit } from '@/utils/emit'

@customElement('mm-follow-button')
export class FollowButton extends LitElement {
  static styles = [buttonBaseStyles, followButtonStyles, buttonSelectedStyles]

  @property({ type: Boolean, reflect: true }) selected = false
  @property({ type: String }) value = ''
  @property({ type: Boolean }) disabled = false

  private toggle = new ToggleController(this, {
    getValue: () => this.selected,
    setValue: selected => {
      this.selected = selected
    },
    isDisabled: () => this.disabled,
  })

  render() {
    return html`
      <button
        type="button"
        ?disabled=${this.disabled}
        aria-pressed=${this.selected ? 'true' : 'false'}
        @click=${this.handleClick}
      >
        ${this.selected ? '팔로우 중' : '팔로우'}
      </button>
    `
  }

  private handleClick() {
    if (!this.toggle.toggle()) return

    emit(this, 'change', { selected: this.selected, value: this.value })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-follow-button': FollowButton
  }
}
