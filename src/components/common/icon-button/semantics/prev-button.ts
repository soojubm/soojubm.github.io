import { customElement } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/common/icon/icon-names'
import { iconActionElement } from '@/components/common/icon-button/icon-button.utils'

@customElement('mm-prev-button')
export class PrevButton extends iconActionElement({
  event: 'prev',
  icon: ICON_NAMES.PREVIOUS,
  ariaLabel: '이전',
}) {}
