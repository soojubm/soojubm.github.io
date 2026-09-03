import { LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'

import { iconButtonActionStyles } from '@/components/common/icon-button/icon-button.styles'
import { renderIconAction, withIconAction } from '@/components/common/icon-button/icon-button.utils'
import { ICON_NAMES } from '@/components/common/icon-button/semantics/icon-names'

@customElement('mm-prev-button')
export class PrevButton extends withIconAction(LitElement, 'prev') {
  static styles = [iconButtonActionStyles]

  render() {
    return renderIconAction(this, { icon: ICON_NAMES.PREVIOUS, ariaLabel: '이전' })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-prev-button': PrevButton
  }
}
