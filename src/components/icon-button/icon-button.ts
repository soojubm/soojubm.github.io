import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { IconName } from '@/components/icon-button/semantics/icon-names'
import type { AriaBoolean, AriaHasPopup, AriaIdRef } from '@/types/aria'

import { iconButtonStyles } from '@/components/icon-button/icon-button.styles'
import { interactiveControlStyles } from '@/stylesheets/shared/interactive-control.styles'

export type IconButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'destructive'
export type IconButtonSize = 'small' | 'medium'

@customElement('mm-icon-button')
class IconButton extends LitElement {
  static styles = [interactiveControlStyles, iconButtonStyles]

  @property({ type: String }) icon?: IconName
  @property({ type: String, reflect: true }) variant: IconButtonVariant = 'tertiary'
  @property({ type: String, reflect: true }) size: IconButtonSize = 'medium'
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = ''
  @property({ type: String }) tooltip = ''
  @property({ type: String, attribute: 'tooltip-placement' }) tooltipPlacement = ''
  @property({ type: Boolean }) disabled = false
  @property({ type: String }) role = ''
  @property({ type: String, attribute: 'aria-haspopup' }) ariaHasPopup: AriaHasPopup = null
  @property({ type: String, attribute: 'aria-expanded' }) ariaExpanded: AriaBoolean = null
  @property({ type: String, attribute: 'aria-controls' }) ariaControls: AriaIdRef = null

  render() {
    const control = this.renderControl()

    if (!this.tooltip) return control

    return html`
      <mm-tooltip content=${this.tooltip} placement=${this.tooltipPlacement}>${control}</mm-tooltip>
    `
  }

  protected get accessibilityLabel(): string {
    return this.ariaLabel || this.tooltip || this.icon || ''
  }

  protected renderControl() {
    return html`
      <button
        slot="trigger"
        type="button"
        role=${this.role || nothing}
        aria-label="${this.accessibilityLabel}"
        ?disabled="${this.disabled}"
        aria-haspopup=${this.ariaHasPopup ?? nothing}
        aria-expanded=${this.ariaExpanded ?? nothing}
        aria-controls=${this.ariaControls ?? nothing}
      >
        <mm-icon name="${this.icon}"></mm-icon>
      </button>
    `
  }
}

export default IconButton
