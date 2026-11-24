import { css } from 'lit'
import { customElement } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/common/icon/icon-names'
import {
  iconButtonStyles,
  iconButtonVariantSkin,
} from '@/components/common/icon-button/icon-button.styles'
import { iconActionElement } from '@/components/common/icon-button/icon-button.utils'
import { resetStyles } from '@/stylesheets/shared.styles'

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
