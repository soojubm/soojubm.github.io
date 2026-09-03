import { LitElement } from 'lit'
import { property } from 'lit/decorators.js'

import { type Constructor, emit } from '@/utils'

export interface IconAction {
  tooltip: string
  tooltipPlacement: string
  disabled: boolean
  handleActionClick(): void
}

/**
 * close·delete·dismiss·next·prev-button처럼 아이콘 하나로 단일 행동을 알리는
 * 시맨틱 버튼이 공유하는 tooltip/disabled 상태와 클릭 배선.
 * 행동의 의미는 이벤트 이름과 레이블로 구분되므로 컴포넌트 자체는 합치지 않는다.
 */
export const withIconAction = <T extends Constructor<LitElement>>(Base: T, eventName: string) => {
  class IconActionElement extends Base {
    @property({ type: String }) tooltip = ''
    @property({ type: String, attribute: 'tooltip-placement' }) tooltipPlacement = ''
    @property({ type: Boolean }) disabled = false

    handleActionClick() {
      if (this.disabled) return

      emit(this, eventName)
    }
  }

  return IconActionElement as Constructor<IconAction> & T
}
