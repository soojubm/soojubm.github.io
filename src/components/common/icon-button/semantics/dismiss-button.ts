import { css } from 'lit'
import { customElement } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/common/icon/icon-names'
import { iconButtonStyles } from '@/components/common/icon-button/icon-button.styles'
import { iconActionElement } from '@/components/common/icon-button/icon-button.utils'

/**
 * 배너, 알림, 토스트 등 비파괴적 해제 버튼.
 */
@customElement('mm-dismiss-button')
export class DismissButton extends iconActionElement({
  event: 'dismiss',
  icon: ICON_NAMES.DISMISS,
  ariaLabel: '닫기',
}) {
  static styles = [
    iconButtonStyles,
    css`
      :host {
        --icon-button-size: var(--size-24);
      }
    `,
  ]
}
