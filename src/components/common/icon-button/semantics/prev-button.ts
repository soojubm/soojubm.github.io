import { customElement, property } from 'lit/decorators.js'

import type { IconButtonSize } from '@/components/common/icon-button/icon-button'

import { ICON_NAMES } from '@/components/common/icon/icon-names'
import { iconActionElement } from '@/components/common/icon-button/icon-button.utils'

@customElement('mm-prev-button')
export class PrevButton extends iconActionElement({
  event: 'prev',
  icon: ICON_NAMES.PREVIOUS,
  ariaLabel: '이전',
}) {
  /** 스크롤 힌트처럼 놓인 자리에 따라 크기가 달라지므로 크기 단계를 받는다. */
  @property({ type: String, reflect: true }) size: IconButtonSize = 'medium'
}
