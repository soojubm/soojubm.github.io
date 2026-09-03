import { LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'

import { iconButtonActionStyles } from '@/components/common/icon-button/icon-button.styles'
import { renderIconAction, withIconAction } from '@/components/common/icon-button/icon-button.utils'
import { ICON_NAMES } from '@/components/common/icon-button/semantics/icon-names'

/**
 * 모달, 패널, 시트 등 레이어를 닫는 버튼.
 */
@customElement('mm-close-button')
export class CloseButton extends withIconAction(LitElement, 'close') {
  static styles = [iconButtonActionStyles]

  render() {
    return renderIconAction(this, { icon: ICON_NAMES.CLOSE, ariaLabel: '닫기' })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-close-button': CloseButton
  }
}
