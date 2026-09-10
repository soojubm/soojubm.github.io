import { LitElement } from 'lit'
import { property } from 'lit/decorators.js'

import { ToggleController } from '@/controllers/toggle-controller'
import { type Constructor, emit } from '@/utils'

export interface TogglePressed {
  pressed: boolean
  value: string
  disabled: boolean
  handleToggleClick(): void
}

/**
 * bookmark-button·follow-button처럼 pressed 상태를 토글하고 'change'로 알리는
 * 시맨틱 버튼이 공유하는 pressed/value/disabled 상태와 토글 배선.
 */
export const withTogglePressed = <T extends Constructor<LitElement>>(Base: T) => {
  class TogglePressedElement extends Base {
    @property({ type: Boolean, reflect: true }) pressed = false
    @property({ type: String }) value = ''
    @property({ type: Boolean }) disabled = false

    private toggle = new ToggleController(this, 'pressed')

    handleToggleClick() {
      if (!this.toggle.toggle()) return

      emit(this, 'change', { pressed: this.pressed, value: this.value })
    }
  }

  return TogglePressedElement as Constructor<TogglePressed> & T
}
