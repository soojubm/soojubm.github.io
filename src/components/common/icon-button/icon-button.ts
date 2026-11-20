import { LitElement, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { IconName } from '@/components/common/icon/icon-names'
import type { TooltipPlacement } from '@/components/overlay/tooltip/tooltip'
import type { AriaBoolean, AriaHasPopup, AriaIdRef } from '@/types'

import {
  iconButtonSelectedStyles,
  iconButtonStyles,
} from '@/components/common/icon-button/icon-button.styles'
import { renderIconButton } from '@/components/common/icon-button/icon-button.utils'
import { resetStyles } from '@/stylesheets/shared.styles'
import type { ComponentSize, ComponentVariant } from '@/stylesheets/shared.types'

export type IconButtonVariant = Exclude<ComponentVariant, 'danger'>
export type IconButtonSize = Extract<ComponentSize, 'small' | 'medium'>

@customElement('mm-icon-button')
export class IconButton extends LitElement {
  static styles = [
    resetStyles,
    iconButtonStyles,
    iconButtonSelectedStyles,
    // 범용 아이콘 버튼은 선택돼도 아이콘이 그대로라 색만으로는 눌린 상태가 약하다. 면도 함께 채운다.
    css`
      :host button[aria-pressed='true'] {
        --icon-button-background-color: var(--interaction-selected-background-color);
      }
    `,
  ]
  @property({ type: String }) icon?: IconName
  @property({ type: String, reflect: true }) variant: IconButtonVariant = 'tertiary'
  @property({ type: Boolean, reflect: true }) destructive = false
  @property({ type: String, reflect: true }) size: IconButtonSize = 'medium'
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = ''
  @property({ type: String, attribute: 'tooltip-placement' })
  tooltipPlacement: TooltipPlacement = 'bottom-start'
  @property({ type: Boolean }) disabled = false
  @property({ type: String, attribute: 'aria-haspopup' }) ariaHasPopup: AriaHasPopup = null
  @property({ type: String, attribute: 'aria-expanded' }) ariaExpanded: AriaBoolean = null
  @property({ type: String, attribute: 'aria-pressed' }) ariaPressed: AriaBoolean = null
  @property({ type: String, attribute: 'aria-controls' }) ariaControls: AriaIdRef = null

  render() {
    return renderIconButton({
      icon: this.icon,
      ariaLabel: this.ariaLabel,
      tooltipPlacement: this.tooltipPlacement,
      disabled: this.disabled,
      ariaHasPopup: this.ariaHasPopup,
      ariaExpanded: this.ariaExpanded,
      ariaPressed: this.ariaPressed,
      ariaControls: this.ariaControls,
    })
  }
}
