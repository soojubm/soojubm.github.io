import { LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'

import { iconButtonActionStyles } from '@/components/common/icon-button/icon-button.styles'
import { renderIconAction, withIconAction } from '@/components/common/icon-button/icon-button.utils'
import { ICON_NAMES } from '@/components/common/icon-button/semantics/icon-names'

/**
 * 배너, 알림, 토스트 등 비파괴적 해제 버튼.
 */
@customElement('mm-dismiss-button')
export class DismissButton extends withIconAction(LitElement, 'dismiss') {
  static styles = [iconButtonActionStyles]

  render() {
    return renderIconAction(this, {
      icon: ICON_NAMES.DISMISS,
      ariaLabel: '닫기',
      variant: 'tertiary',
      size: 'small',
    })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-dismiss-button': DismissButton
  }
}
