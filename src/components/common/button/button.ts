import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { IconName } from '@/components/common/icon/icon-names'
import type { AriaBoolean, AriaCurrent, AriaHasPopup, AriaIdRef } from '@/types'

import { buttonBaseStyles, buttonVariantStyles } from '@/components/common/button/button.styles'
import '@/components/common/dot/semantics/current-indicator'
import { dotBelowStyles } from '@/components/common/dot/dot.styles'
import '@/components/common/icon'
import { resetStyles } from '@/stylesheets/shared.styles'
import type { ComponentSize, ComponentVariant } from '@/stylesheets/shared.types'

export type ButtonVariant = Exclude<ComponentVariant, 'ghost' | 'danger'>
export type ButtonSize = Extract<ComponentSize, 'medium' | 'large'>
export type ButtonIconPosition = 'leading' | 'trailing'
export type ButtonType = 'button' | 'submit' | 'reset'

@customElement('fff-button')
export class Button extends LitElement {
  static styles = [
    resetStyles,
    buttonBaseStyles,
    buttonVariantStyles,
    css`
      button[aria-current] {
        position: relative;
      }

      fff-current-indicator {
        ${dotBelowStyles};
      }
    `,
  ]
  @property({ type: String, reflect: true }) variant: ButtonVariant = 'secondary'
  @property({ type: Boolean, reflect: true }) destructive = false
  @property({ type: String, reflect: true }) size: ButtonSize = 'medium'
  @property({ type: Boolean, attribute: 'full-width', reflect: true }) fullWidth = false
  @property({ type: String }) type: ButtonType = 'button'
  @property({ type: Boolean }) disabled = false
  @property({ type: String }) icon?: IconName
  @property({ type: String, attribute: 'icon-position' }) iconPosition: ButtonIconPosition =
    'leading'
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = ''
  @property({ type: String, attribute: 'aria-expanded' }) ariaExpanded: AriaBoolean = null
  @property({ type: String, attribute: 'aria-haspopup' }) ariaHasPopup: AriaHasPopup = null
  @property({ type: String, attribute: 'aria-controls' }) ariaControls: AriaIdRef = null
  @property({ type: String, attribute: 'aria-current', reflect: true }) ariaCurrent: AriaCurrent =
    null

  render() {
    return html`
      <button
        type=${this.type}
        ?disabled=${this.disabled}
        aria-label=${this.ariaLabel || nothing}
        aria-expanded=${ifDefined(this.ariaExpanded ?? undefined)}
        aria-haspopup=${ifDefined(this.ariaHasPopup ?? undefined)}
        aria-controls=${ifDefined(this.ariaControls ?? undefined)}
        aria-current=${ifDefined(this.ariaCurrent ?? undefined)}
        @click=${this.handleClick}
      >
        ${this.renderIcon('leading')}
        <slot></slot>
        ${this.renderIcon('trailing')} ${this.renderCurrentIndicator()}
      </button>
    `
  }

  private handleClick(event: Event) {
    if (this.disabled) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  private renderCurrentIndicator() {
    if (!this.ariaCurrent || this.ariaCurrent === 'false') return nothing

    return html`
      <fff-current-indicator></fff-current-indicator>
    `
  }

  private renderIcon(position: ButtonIconPosition) {
    if (!this.icon || this.iconPosition !== position) return nothing

    return html`
      <fff-icon name=${this.icon}></fff-icon>
    `
  }
}
