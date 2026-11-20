import { css } from 'lit'
import { customElement } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/common/icon/icon-names'
import {
  iconButtonStyles,
  iconButtonVariantSkin,
} from '@/components/common/icon-button/icon-button.styles'
import { iconActionElement } from '@/components/common/icon-button/icon-button.utils'
import { resetStyles } from '@/stylesheets/shared.styles'

/**
 * 콘텐츠를 공유하는 버튼.
 * 무엇을 어떻게 공유할지는 소비처가 정하므로, 누르면 share 이벤트만 알린다.
 */
@customElement('mm-share-button')
export class ShareButton extends iconActionElement({
  event: 'share',
  icon: ICON_NAMES.SHARE,
  ariaLabel: '공유',
}) {
  static styles = [
    resetStyles,
    iconButtonStyles,
    css`
      :host {
        ${iconButtonVariantSkin('ghost')}
        --icon-button-text-color: var(--foreground-subtle-color);
      }
    `,
  ]
}
