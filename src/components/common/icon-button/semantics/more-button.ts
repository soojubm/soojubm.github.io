import { LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { AriaBoolean, AriaIdRef } from '@/types'

import { ICON_NAMES } from '@/components/common/icon/icon-names'
import {
  iconButtonSecondarySkinStyles,
  iconButtonStyles,
} from '@/components/common/icon-button/icon-button.styles'
import { renderIconAction } from '@/components/common/icon-button/icon-button.utils'

/**
 * 추가 액션 메뉴를 여는 버튼.
 */
@customElement('mm-more-button')
export class MoreButton extends LitElement {
  static styles = [iconButtonStyles, iconButtonSecondarySkinStyles]

  @property({ type: String, attribute: 'aria-label' }) ariaLabel = '더보기'
  @property({ type: String, attribute: 'aria-expanded' }) ariaExpanded: AriaBoolean = 'false'
  @property({ type: String, attribute: 'aria-controls' }) ariaControls: AriaIdRef = null
  @property({ type: Boolean }) disabled = false

  render() {
    return renderIconAction({
      icon: ICON_NAMES.MORE_ACTIONS,
      ariaLabel: this.ariaLabel,
      tooltipPlacement: 'center',
      disabled: this.disabled,
      ariaHasPopup: 'menu',
      ariaExpanded: this.ariaExpanded,
      ariaControls: this.ariaControls,
    })
  }
}
