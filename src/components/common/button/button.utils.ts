import { LitElement, html, nothing } from 'lit'
import { property } from 'lit/decorators.js'

import type { ButtonSize, ButtonVariant } from '@/components/common/button/button'
import type { ActionConfig } from '@/types'

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

interface ActionButtonsOptions {
  primaryAction?: ActionConfig
  secondaryAction?: ActionConfig
  size?: ButtonSize
  fullWidth?: boolean
}

/**
 * primaryAction·secondaryAction을 받는 컴포넌트가 공유하는 버튼 쌍 조립 규칙.
 * secondary(tertiary)를 앞에, primary를 뒤에 두고, 감싸는 mm-button-group의 정렬은 각 컴포넌트가 정한다.
 */
export function renderActionButtons({
  primaryAction,
  secondaryAction,
  size = 'medium',
  fullWidth = false,
}: ActionButtonsOptions) {
  return html`
    ${renderActionButton(secondaryAction, 'tertiary', size, fullWidth)}
    ${renderActionButton(primaryAction, 'primary', size, fullWidth)}
  `
}

function renderActionButton(
  action: ActionConfig | undefined,
  variant: ButtonVariant,
  size: ButtonSize,
  fullWidth: boolean,
) {
  if (!action) return nothing

  return html`
    <mm-button
      variant=${variant}
      size=${size}
      ?full-width=${fullWidth}
      ?disabled=${action.disabled}
      @click=${() => action.onClick?.()}
    >
      ${action.label}
    </mm-button>
  `
}
