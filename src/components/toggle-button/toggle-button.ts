import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { IconName } from '@/components/icon-button/semantics/icon-names'

import {
  buttonBaseStyles,
  toggleButtonStyles,
  buttonSelectedStyles,
} from '@/components/button/button.styles'
import { toggleSelection } from '@/components/button/button.utils'
import '@/components/icon/icon'

@customElement('mm-toggle-button')
export class ToggleButton extends LitElement {
  static styles = [buttonBaseStyles, toggleButtonStyles, buttonSelectedStyles]

  @property({ type: Boolean, reflect: true }) selected = false
  @property({ type: String }) value = ''
  @property({ type: String }) icon?: IconName
  @property({ type: Boolean }) disabled = false
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = ''

  render() {
    return html`
      <button
        type="button"
        ?disabled=${this.disabled}
        aria-pressed=${this.selected ? 'true' : 'false'}
        aria-label=${this.ariaLabel || nothing}
        @click=${this.handleClick}
      >
        ${this.renderIcon()}
        <slot></slot>
      </button>
    `
  }

  private renderIcon() {
    if (!this.icon) return nothing

    return html`
      <mm-icon name=${this.icon}></mm-icon>
    `
  }

  private handleClick(event: Event) {
    event.stopPropagation()
    toggleSelection(this)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-toggle-button': ToggleButton
  }
}
