import { customElement } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/common/icon/icon-names'
import { iconActionElement } from '@/components/common/icon-button/icon-button.utils'

@customElement('mm-next-button')
export class NextButton extends iconActionElement({
  event: 'next',
  icon: ICON_NAMES.NEXT,
  ariaLabel: '다음',
}) {}
