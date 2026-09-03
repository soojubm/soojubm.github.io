import { LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'

import { interactiveControlStyles } from '@/components/common/button/button.styles'
import {
  iconButtonSecondarySkinStyles,
  iconButtonStyles,
} from '@/components/common/icon-button/icon-button.styles'
import { renderIconAction, withIconAction } from '@/components/common/icon-button/icon-button.utils'
import { ICON_NAMES } from '@/components/common/icon-button/semantics/icon-names'

@customElement('mm-next-button')
export class NextButton extends withIconAction(LitElement, 'next') {
  static styles = [interactiveControlStyles, iconButtonStyles, iconButtonSecondarySkinStyles]

  render() {
    return renderIconAction({
      icon: ICON_NAMES.NEXT,
      ariaLabel: '다음',
      tooltip: this.tooltip,
      tooltipPlacement: this.tooltipPlacement,
      disabled: this.disabled,
      onClick: this.handleActionClick,
    })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-next-button': NextButton
  }
}
