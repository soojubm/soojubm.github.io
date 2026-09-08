import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { IconName } from '@/components/common/icon/icon-names'
import type { AriaBoolean, AriaHasPopup, AriaIdRef } from '@/types'

import { iconButtonStyles } from '@/components/common/icon-button/icon-button.styles'
import { renderWithOptionalTooltip } from '@/components/common/icon-button/icon-button.utils'
import '@/components/common/icon'

export type IconButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'destructive'
export type IconButtonSize = 'small' | 'medium'

@customElement('mm-icon-button')
class IconButton extends LitElement {
  static styles = [iconButtonStyles]

  @property({ type: String }) icon?: IconName
  @property({ type: String, reflect: true }) variant: IconButtonVariant = 'tertiary'
  @property({ type: String, reflect: true }) size: IconButtonSize = 'medium'
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = ''
  @property({ type: String }) tooltip = ''
  @property({ type: String, attribute: 'tooltip-placement' }) tooltipPlacement = ''
  @property({ type: Boolean }) disabled = false
  @property({ type: String, attribute: 'aria-haspopup' }) ariaHasPopup: AriaHasPopup = null
  @property({ type: String, attribute: 'aria-expanded' }) ariaExpanded: AriaBoolean = null
  @property({ type: String, attribute: 'aria-controls' }) ariaControls: AriaIdRef = null

  render() {
    return renderWithOptionalTooltip(this.tooltip, this.tooltipPlacement, this.renderControl())
  }

  protected get accessibilityLabel(): string {
    return this.ariaLabel || this.tooltip || this.icon || ''
  }

  protected renderControl() {
    return html`
      <button
        slot="trigger"
        type="button"
        aria-label=${this.accessibilityLabel}
        ?disabled=${this.disabled}
        aria-haspopup=${ifDefined(this.ariaHasPopup ?? undefined)}
        aria-expanded=${ifDefined(this.ariaExpanded ?? undefined)}
        aria-controls=${ifDefined(this.ariaControls ?? undefined)}
      >
        <mm-icon name=${this.icon}></mm-icon>
      </button>
    `
  }
}

export default IconButton
