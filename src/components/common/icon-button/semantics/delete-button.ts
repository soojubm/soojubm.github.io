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
 * 아이템·데이터를 영구 삭제하는 파괴적 액션 버튼.
 */
@customElement('mm-delete-button')
export class DeleteButton extends iconActionElement({
  event: 'delete',
  icon: ICON_NAMES.DELETE,
  ariaLabel: '삭제',
}) {
  static styles = [
    resetStyles,
    iconButtonStyles,
    css`
      :host {
        ${iconButtonVariantSkin('danger')}
      }
    `,
  ]
  // 파괴적 행동이라 확인을 거친 뒤에만 알린다.
  override handleActionClick() {
    if (!window.confirm('정말 삭제하시겠어요?')) return

    super.handleActionClick()
  }
}
