import { LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { IconName } from '@/components/common/icon/icon-names'
import type { TooltipPlacement } from '@/components/overlay/tooltip/tooltip'
import type { AriaBoolean, AriaHasPopup, AriaIdRef } from '@/types'

import { iconButtonStyles } from '@/components/common/icon-button/icon-button.styles'
import { renderIconAction } from '@/components/common/icon-button/icon-button.utils'
import { resetStyles, type ComponentSize, type ComponentVariant } from '@/stylesheets/shared.styles'

export type IconButtonVariant = ComponentVariant
export type IconButtonSize = Extract<ComponentSize, 'small' | 'medium'>

@customElement('mm-icon-button')
export class IconButton extends LitElement {
  static styles = [resetStyles, iconButtonStyles]
  @property({ type: String }) icon?: IconName
  @property({ type: String, reflect: true }) variant: IconButtonVariant = 'tertiary'
  @property({ type: String, reflect: true }) size: IconButtonSize = 'medium'
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = ''
  @property({ type: String, attribute: 'tooltip-placement' })
  tooltipPlacement: TooltipPlacement = 'bottom-start'
  @property({ type: Boolean }) disabled = false
  @property({ type: String, attribute: 'aria-haspopup' }) ariaHasPopup: AriaHasPopup = null
  @property({ type: String, attribute: 'aria-expanded' }) ariaExpanded: AriaBoolean = null
  @property({ type: String, attribute: 'aria-controls' }) ariaControls: AriaIdRef = null

  render() {
    return renderIconAction({
      icon: this.icon,
      ariaLabel: this.ariaLabel,
      tooltipPlacement: this.tooltipPlacement,
      disabled: this.disabled,
      ariaHasPopup: this.ariaHasPopup,
      ariaExpanded: this.ariaExpanded,
      ariaControls: this.ariaControls,
    })
  }
}
