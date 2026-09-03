import { LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'

import { interactiveControlStyles } from '@/components/common/button/button.styles'
import {
  iconButtonSecondarySkinStyles,
  iconButtonStyles,
} from '@/components/common/icon-button/icon-button.styles'
import { renderIconAction, withIconAction } from '@/components/common/icon-button/icon-button.utils'
import { ICON_NAMES } from '@/components/common/icon-button/semantics/icon-names'

@customElement('mm-prev-button')
export class PrevButton extends withIconAction(LitElement, 'prev') {
  static styles = [interactiveControlStyles, iconButtonStyles, iconButtonSecondarySkinStyles]

  render() {
    return renderIconAction({
      icon: ICON_NAMES.PREVIOUS,
      ariaLabel: '이전',
      tooltip: this.tooltip,
      tooltipPlacement: this.tooltipPlacement,
      disabled: this.disabled,
      onClick: this.handleActionClick,
    })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-prev-button': PrevButton
  }
}
