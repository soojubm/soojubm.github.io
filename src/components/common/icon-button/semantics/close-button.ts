import { customElement } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/common/icon/icon-names'
import { iconActionElement } from '@/components/common/icon-button/icon-button.utils'

/**
 * 모달, 패널, 시트 등 레이어를 닫는 버튼.
 */
@customElement('mm-close-button')
export class CloseButton extends iconActionElement({
  event: 'close',
  icon: ICON_NAMES.CLOSE,
  ariaLabel: '닫기',
}) {}
