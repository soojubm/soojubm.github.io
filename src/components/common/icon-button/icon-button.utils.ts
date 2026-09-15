import { LitElement, html } from 'lit'
import { property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { IconName } from '@/components/common/icon/icon-names'
import type { AriaBoolean, AriaHasPopup, AriaIdRef } from '@/types'
import type { CSSResultGroup, TemplateResult } from 'lit'

import {
  iconButtonSecondarySkinStyles,
  iconButtonStyles,
} from '@/components/common/icon-button/icon-button.styles'
import { resetStyles } from '@/stylesheets/shared.styles'
import { type Constructor, emit } from '@/utils'
import '@/components/overlay/tooltip'
import '@/components/common/icon'

export interface IconAction {
  tooltipPlacement: string
  disabled: boolean
  handleActionClick(): void
}

/**
 * close·delete·dismiss·next·prev-button처럼 아이콘 하나로 단일 행동을 알리는
 * 시맨틱 버튼이 공유하는 tooltip 위치·disabled 상태와 클릭 배선.
 * 행동의 의미는 이벤트 이름과 레이블로 구분되므로 컴포넌트 자체는 합치지 않는다.
 */
export const withIconAction = <T extends Constructor<LitElement>>(Base: T, eventName: string) => {
  class IconActionElement extends Base {
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
  icon?: IconName
  ariaLabel: string
  tooltipPlacement?: string
  disabled?: boolean
  onClick?: (event: Event) => void
  ariaHasPopup?: AriaHasPopup
  ariaExpanded?: AriaBoolean
  ariaControls?: AriaIdRef
}

/**
 * icon-button 계열(아이콘 하나로 동작을 알리는 시맨틱 버튼)이 공유하는 button+아이콘 조립 템플릿.
 * 아이콘만으로는 의미를 알 수 없으므로 aria-label은 필수이고, 같은 이름을 tooltip으로 항상 보여준다.
 */
export const renderIconAction = ({
  icon,
  ariaLabel,
  tooltipPlacement = '',
  disabled = false,
  onClick = () => {},
  ariaHasPopup,
  ariaExpanded,
  ariaControls,
}: IconActionRenderOptions): TemplateResult => html`
  <mm-tooltip content=${ariaLabel} placement=${tooltipPlacement}>
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
  </mm-tooltip>
`

export interface IconActionDefinition {
  /** 이 버튼이 알리는 행동. 이벤트 이름이 된다. */
  event: string
  icon: IconName
  ariaLabel: string
}

/**
 * 아이콘 하나로 단일 행동만 알리는 시맨틱 버튼의 기반 클래스를 만든다.
 * 스타일과 템플릿은 계열이 공유하고, 태그명·행동 이름·레이블은 각 컴포넌트가 자기 API로 갖는다.
 * 기본 스킨이 아니면 자기 static styles로 덮고, 다른 템플릿이 필요하면
 * withIconAction으로 상태만 받아 자기 render를 쓴다.
 */
export const iconActionElement = ({ event, icon, ariaLabel }: IconActionDefinition) => {
  class IconActionButton extends withIconAction(LitElement, event) {
    static styles: CSSResultGroup = [resetStyles, iconButtonStyles, iconButtonSecondarySkinStyles]

    render() {
      return renderIconAction({
        icon,
        ariaLabel,
        tooltipPlacement: this.tooltipPlacement,
        disabled: this.disabled,
        onClick: this.handleActionClick,
      })
    }
  }

  return IconActionButton
}
