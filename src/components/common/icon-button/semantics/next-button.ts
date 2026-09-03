import { LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'

import { iconButtonActionStyles } from '@/components/common/icon-button/icon-button.styles'
import { renderIconAction, withIconAction } from '@/components/common/icon-button/icon-button.utils'
import { ICON_NAMES } from '@/components/common/icon-button/semantics/icon-names'

@customElement('mm-next-button')
export class NextButton extends withIconAction(LitElement, 'next') {
  static styles = [iconButtonActionStyles]

  render() {
    return renderIconAction(this, { icon: ICON_NAMES.NEXT, ariaLabel: '다음' })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-next-button': NextButton
  }
}
