import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { IconName } from '@/components/common/icon/icon-names'

import {
  buttonBaseStyles,
  toggleButtonStyles,
  buttonSelectedStyles,
} from '@/components/common/button/button.styles'
import { ToggleController } from '@/controllers/toggle-controller'
import { resetStyles } from '@/stylesheets/shared.styles'
import '@/components/common/icon/icon'

@customElement('mm-toggle-button')
export class ToggleButton extends LitElement {
  static styles = [resetStyles, buttonBaseStyles, toggleButtonStyles, buttonSelectedStyles]
  @property({ type: Boolean }) pressed = false
  @property({ type: String, attribute: 'pressed-label' }) pressedLabel?: string
  @property({ type: String }) value = ''
  @property({ type: String }) icon?: IconName
  @property({ type: Boolean }) disabled = false
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = ''
  private toggle: ToggleController<'pressed'> = new ToggleController(this, 'pressed')

  render() {
    return html`
      <button
        type="button"
        ?disabled=${this.disabled}
        aria-pressed=${this.pressed ? 'true' : 'false'}
        aria-label=${this.ariaLabel || nothing}
        @click=${this.handleClick}
      >
        ${this.renderIcon()} ${this.renderLabel()}
      </button>
    `
  }

  private renderIcon() {
    if (!this.icon) return nothing

    return html`
      <mm-icon name=${this.icon}></mm-icon>
    `
  }

  private renderLabel() {
    if (this.pressed && this.pressedLabel) return this.pressedLabel

    return html`
      <slot></slot>
    `
  }

  private handleClick(event: Event) {
    event.stopPropagation()
    this.toggle.toggle()
  }
}
