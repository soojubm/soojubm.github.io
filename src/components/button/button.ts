import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { IconName } from '@/components/icon-button/semantics/icon-names'
import type { AriaBoolean, AriaHasPopup } from '@/types/aria'

import {
  buttonBaseStyles,
  buttonSizeStyles,
  buttonVariantStyles,
} from '@/components/button/button.styles'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'destructive'
export type ButtonSize = 'huge' | 'large' | 'medium' | 'small'
export type ButtonIconPosition = 'leading' | 'trailing'
export type ButtonType = 'button' | 'submit' | 'reset'

@customElement('mm-button')
export class Button extends LitElement {
  static styles = [buttonBaseStyles, buttonSizeStyles, buttonVariantStyles]

  @property({ type: String, reflect: true }) variant: ButtonVariant = 'tertiary'
  @property({ type: String, reflect: true }) size: ButtonSize = 'medium'
  @property({ type: Boolean, attribute: 'full-width', reflect: true }) isFullWidth = false
  @property({ type: String }) type: ButtonType = 'button'
  @property({ type: Boolean }) disabled = false
  @property({ type: String }) icon?: IconName
  @property({ type: String, attribute: 'icon-position' }) iconPosition: ButtonIconPosition =
    'leading'
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = ''
  @property({ type: String, attribute: 'aria-expanded' }) ariaExpanded: AriaBoolean = null
  @property({ type: String, attribute: 'aria-haspopup' }) ariaHasPopup: AriaHasPopup = null

  render() {
    return html`
      <button
        type=${this.type}
        ?disabled=${this.disabled}
        aria-label=${this.ariaLabel || nothing}
        aria-expanded=${ifDefined(this.ariaExpanded ?? undefined)}
        aria-haspopup=${ifDefined(this.ariaHasPopup ?? undefined)}
        @click=${this.handleClick}
      >
        ${this.renderIcon('leading')}
        <slot></slot>
        ${this.renderIcon('trailing')}
      </button>
    `
  }

  private handleClick(event: Event) {
    if (this.disabled) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  private renderIcon(position: ButtonIconPosition) {
    if (!this.icon || this.iconPosition !== position) {
      return nothing
    }

    return html`
      <mm-icon name=${this.icon}></mm-icon>
    `
  }
}

export default Button
