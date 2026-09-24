import { LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { AriaBoolean, AriaHasPopup, AriaIdRef } from '@/types'

import { ICON_NAMES } from '@/components/common/icon/icon-names'
import {
  iconButtonSecondarySkinStyles,
  iconButtonStyles,
} from '@/components/common/icon-button/icon-button.styles'
import { renderIconAction } from '@/components/common/icon-button/icon-button.utils'
import { resetStyles } from '@/stylesheets/shared.styles'

/**
 * 추가 액션 메뉴를 여는 버튼.
 */
@customElement('mm-more-button')
export class MoreButton extends LitElement {
  static styles = [resetStyles, iconButtonStyles, iconButtonSecondarySkinStyles]
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = '더보기'
  @property({ type: String, attribute: 'aria-expanded' }) ariaExpanded: AriaBoolean = 'false'
  @property({ type: String, attribute: 'aria-controls' }) ariaControls: AriaIdRef = null
  @property({ type: String, attribute: 'aria-haspopup' }) ariaHasPopup: AriaHasPopup = 'menu'
  @property({ type: String, attribute: 'tooltip-placement' }) tooltipPlacement = 'center'
  @property({ type: Boolean }) disabled = false

  render() {
    return renderIconAction({
      icon: ICON_NAMES.MORE_ACTIONS,
      ariaLabel: this.ariaLabel,
      tooltipPlacement: this.tooltipPlacement,
      disabled: this.disabled,
      ariaHasPopup: this.ariaHasPopup,
      ariaExpanded: this.ariaExpanded,
      ariaControls: this.ariaControls,
    })
  }
}
