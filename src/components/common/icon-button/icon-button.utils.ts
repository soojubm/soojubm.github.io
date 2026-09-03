import { LitElement, html } from 'lit'
import { property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { IconButtonSize, IconButtonVariant } from '@/components/common/icon-button/icon-button'
import type { IconName } from '@/components/common/icon-button/semantics/icon-names'
import type { TemplateResult } from 'lit'

import { type Constructor, emit } from '@/utils'
import '@/components/common/icon-button/icon-button'

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

export interface IconActionRenderOptions {
  icon: IconName
  ariaLabel: string
  variant?: IconButtonVariant
  size?: IconButtonSize
}

/**
 * withIconAction 계열이 공유하는 mm-icon-button 조립 템플릿.
 * icon·variant·size·aria-label만 컴포넌트별로 다르고 tooltip·disabled·click 배선은 동일하다.
 */
export const renderIconAction = (
  host: IconAction,
  { icon, ariaLabel, variant = 'secondary', size }: IconActionRenderOptions,
): TemplateResult => html`
  <mm-icon-button
    icon=${icon}
    variant=${variant}
    size=${ifDefined(size)}
    aria-label=${ariaLabel}
    tooltip=${host.tooltip}
    tooltip-placement=${host.tooltipPlacement}
    ?disabled=${host.disabled}
    @click=${host.handleActionClick}
  ></mm-icon-button>
`
