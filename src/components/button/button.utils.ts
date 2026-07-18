import { LitElement } from 'lit'
import { property } from 'lit/decorators.js'

import { ToggleController } from '@/controllers/toggle-controller'
import { emit } from '@/utils/emit'

type Constructor<T = object> = new (...args: any[]) => T

export interface ToggleSelection {
  selected: boolean
  value: string
  disabled: boolean
  handleToggle(): void
}

/**
 * bookmark-button·follow-button처럼 selected 상태를 토글하고 'change'로 알리는
 * 시맨틱 버튼이 공유하는 selected/value/disabled 상태와 토글 배선.
 */
export const withToggleSelection = <T extends Constructor<LitElement>>(Base: T) => {
  class ToggleSelectionElement extends Base {
    @property({ type: Boolean, reflect: true }) selected = false
    @property({ type: String }) value = ''
    @property({ type: Boolean }) disabled = false

    private toggle = new ToggleController(this, {
      getValue: () => this.selected,
      setValue: selected => {
        this.selected = selected
      },
      isDisabled: () => this.disabled,
    })

    handleToggle() {
      if (!this.toggle.toggle()) return

      emit(this, 'change', { selected: this.selected, value: this.value })
    }
  }

  return ToggleSelectionElement as Constructor<ToggleSelection> & T
}
