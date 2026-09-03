import { LitElement, html } from 'lit'
import { property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { IconName } from '@/components/common/icon-button/semantics/icon-names'
import type { AriaBoolean, AriaHasPopup, AriaIdRef } from '@/types'
import type { TemplateResult } from 'lit'

import { type Constructor, emit } from '@/utils'
import '@/components/overlay/tooltip'
import '@/components/common/icon'

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

/**
 * tooltip이 있을 때만 mm-tooltip으로 감싼다. icon-button 베이스가 쓰는 조립 규칙.
 */
export const renderWithOptionalTooltip = (
  tooltip: string,
  tooltipPlacement: string,
  control: TemplateResult,
): TemplateResult => {
  if (!tooltip) return control

  return html`
    <mm-tooltip content=${tooltip} placement=${tooltipPlacement}>${control}</mm-tooltip>
  `
}

export interface IconActionRenderOptions {
  icon: IconName
  ariaLabel: string
  tooltip?: string
  tooltipPlacement?: string
  disabled?: boolean
  onClick?: (event: Event) => void
  ariaHasPopup?: AriaHasPopup
  ariaExpanded?: AriaBoolean
  ariaControls?: AriaIdRef
}

/**
 * icon-button 계열(아이콘 하나로 동작을 알리는 시맨틱 버튼)이 공유하는 button+아이콘 조립 템플릿.
 * 아이콘만으로는 의미를 알 수 없으므로 tooltip은 선택이 아니라 항상 보이며,
 * 따로 지정하지 않으면 aria-label을 그대로 tooltip 내용으로 쓴다.
 */
export const renderIconAction = ({
  icon,
  ariaLabel,
  tooltip,
  tooltipPlacement = '',
  disabled = false,
  onClick = () => {},
  ariaHasPopup,
  ariaExpanded,
  ariaControls,
}: IconActionRenderOptions): TemplateResult =>
  renderWithOptionalTooltip(
    tooltip || ariaLabel,
    tooltipPlacement,
    html`
      <button
        slot="trigger"
        type="button"
        aria-label=${ariaLabel}
        aria-haspopup=${ifDefined(ariaHasPopup ?? undefined)}
        aria-expanded=${ifDefined(ariaExpanded ?? undefined)}
        aria-controls=${ifDefined(ariaControls ?? undefined)}
        ?disabled=${disabled}
        @click=${onClick}
      >
        <mm-icon name=${icon}></mm-icon>
      </button>
    `,
  )
