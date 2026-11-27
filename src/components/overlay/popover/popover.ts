import { LitElement, html } from 'lit'
import { customElement, property, query, queryAssignedElements } from 'lit/decorators.js'

import {
  overlaySurfaceStyles,
  popoverPositionStyles,
  type AnchorPlacementType,
} from '@/components/overlay/overlay.styles'
import '@/components/common'
import { AnchorController } from '@/controllers/anchor-controller'
import { DisclosureController } from '@/controllers/disclosure-controller'
import { EscapeKeyController } from '@/controllers/escape-key-controller'
import { OutsideClickController } from '@/controllers/outside-click-controller'
import { PortalController } from '@/controllers/portal-controller'
import { ScheduleController } from '@/controllers/schedule-controller'
import { getDeepActiveElement } from '@/utils'
import { withOpenState } from '@/utils/open-state'

export type PopoverPlacement = Extract<
  AnchorPlacementType,
  'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'
>

// 열리면 포커스를 먼저 받아 방향키로 탐색하는 목록(없으면 autofocus 요소, 그것도 없으면 표면 자체가 받는다).
// 방향키 탐색은 이 목록이 소유한다.
const LIST_SELECTOR = 'mm-menu-item-group, mm-select-listbox'

// 선호한 방향으로 열면 화면 밖으로 넘칠 때 축마다 뒤집을 방향
const BLOCK_FLIPPED = {
  'bottom-start': 'top-start',
  'bottom-end': 'top-end',
  'top-start': 'bottom-start',
  'top-end': 'bottom-end',
} as const satisfies Record<PopoverPlacement, PopoverPlacement>

const INLINE_FLIPPED = {
  'bottom-start': 'bottom-end',
  'bottom-end': 'bottom-start',
  'top-start': 'top-end',
  'top-end': 'top-start',
} as const satisfies Record<PopoverPlacement, PopoverPlacement>

// 선호 방향이 넘치고 반대쪽이 덜 넘칠 때만 뒤집는다. 둘 다 넘치면 덜 넘치는 쪽이 낫다.
function shouldFlip(preferredOverflow: number, oppositeOverflow: number) {
  return preferredOverflow > 0 && oppositeOverflow < preferredOverflow
}

@customElement('mm-popover')
export class Popover extends withOpenState(LitElement) {
  static styles = [overlaySurfaceStyles, popoverPositionStyles]
  /** 선호하는 열 방향. 그쪽 공간이 모자라 화면 밖으로 넘치면 반대쪽으로 뒤집어 연다. */
  @property({ type: String }) placement: PopoverPlacement = 'bottom-start'
  /** 위치를 재는 기준 요소. 생략하면 aria-controls로 이 popover를 가리키는 트리거가 기준이다. */
  @property({ attribute: false }) anchor?: HTMLElement
  @query('.panel') private panel!: HTMLElement
  @queryAssignedElements({ flatten: true })
  private contentElements!: HTMLElement[]
  private returnFocusElement?: HTMLElement
  private portal = new PortalController(this)
  private disclosure = new DisclosureController(this, {
    getRoot: () => this.portal.originRoot,
  })
  private outsideClick = new OutsideClickController(this, () => this.close(), {
    open: () => this.open,
    getTrigger: () => this.anchorElement,
  })
  private escapeKey = new EscapeKeyController(this)
  private anchorPosition = new AnchorController(this, {
    getAnchor: () => this.anchorElement,
    open: () => this.open,
    variables: {
      left: '--popover-anchor-left',
      top: '--popover-anchor-top',
      width: '--popover-anchor-width',
      height: '--popover-anchor-height',
    },
    onMeasure: rect => this.fitPlacement(rect),
  })
  private focusExitCheck = new ScheduleController(this, () => this.closeIfFocusLeft(), { delay: 0 })

  constructor() {
    super()
    // 리스너 대상이 host 자신이라 연결이 바뀌어도 유지되므로 생성자에서 한 번만 등록한다.
    this.addEventListener('keydown', this.handleKeydown)
  }

  render() {
    return html`
      <div class="panel">
        <mm-scroll direction="column">
          <slot></slot>
        </mm-scroll>
      </div>
    `
  }

  connectedCallback() {
    super.connectedCallback()
    // 열릴 때 목록이 없는 내용은 표면 자체가 포커스를 받을 수 있게 하되, Tab 순서에는 넣지 않는다.
    if (!this.hasAttribute('tabindex')) this.tabIndex = -1
  }

  protected updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.get('open') === undefined) return

    if (this.open) {
      this.focusContent()
      return
    }

    this.restoreFocus()
  }

  private get anchorElement() {
    return this.anchor ?? this.disclosure.trigger
  }

  // 패널이 실제로 놓일 방향을 정한다. 패널 크기는 열린 뒤에야 알 수 있어 렌더가 아니라 측정 시점에 패널에 바로 싣는다.
  private fitPlacement(anchor: DOMRect) {
    const { offsetWidth: width, offsetHeight: height } = this.panel
    const { clientWidth, clientHeight } = document.documentElement
    const overflowAbove = height - anchor.top
    const overflowBelow = anchor.bottom + height - clientHeight
    // start 정렬은 트리거 왼쪽 끝에서 오른쪽으로, end 정렬은 오른쪽 끝에서 왼쪽으로 자란다
    const overflowRight = anchor.left + width - clientWidth
    const overflowLeft = width - anchor.right

    const opensUp = this.placement.startsWith('top')
    const opensLeft = this.placement.endsWith('end')
    const flipBlock = opensUp
      ? shouldFlip(overflowAbove, overflowBelow)
      : shouldFlip(overflowBelow, overflowAbove)
    const flipInline = opensLeft
      ? shouldFlip(overflowLeft, overflowRight)
      : shouldFlip(overflowRight, overflowLeft)

    const blockFitted = flipBlock ? BLOCK_FLIPPED[this.placement] : this.placement
    const fitted = flipInline ? INLINE_FLIPPED[blockFitted] : blockFitted
    this.panel.dataset.placement = fitted
  }

  // portal로 문서 끝에 놓여 Tab으로 밖에 나가면 엉뚱한 곳에 닿으므로, 포커스가 표면을 벗어나면 닫고 트리거로 돌려보낸다.
  // 포커스는 Tab 처리가 끝난 뒤에 옮겨 가므로 한 틱 뒤에 판단한다.
  private handleKeydown = (event: KeyboardEvent) => {
    if (event.key !== 'Tab') return

    this.focusExitCheck.request()
  }

  private closeIfFocusLeft() {
    if (!this.open || this.matches(':focus-within')) return

    this.close()
    this.returnFocus()
  }

  // 열리면 포커스를 표면 안으로 옮기고, 닫힐 때 돌아갈 요소를 기억한다.
  // 목록이 있으면 목록으로, 안의 autofocus 요소가 있으면 그 요소로, 없으면 표면 자체로 옮긴다.
  private focusContent() {
    this.returnFocusElement = getDeepActiveElement() as HTMLElement | undefined
    const target = this.findList() ?? this.querySelector<HTMLElement>('[autofocus]') ?? this
    target.focus({ preventScroll: true })
  }

  // 선택 그룹처럼 목록을 자기 shadow 안에 렌더하는 래퍼도 있으므로 한 단계 안까지 찾는다.
  private findList() {
    for (const element of this.contentElements) {
      if (element.matches(LIST_SELECTOR)) return element
      const list = element.shadowRoot?.querySelector<HTMLElement>(LIST_SELECTOR)
      if (list) return list
    }
  }

  // 포커스가 표면 안에 있던 채로 닫히면(ESC·항목 선택) 숨겨진 요소에 포커스가 남지 않게 트리거로 돌린다.
  private restoreFocus() {
    if (!this.matches(':focus-within')) return

    this.returnFocus()
  }

  private returnFocus() {
    ;(this.returnFocusElement ?? this.anchorElement)?.focus()
  }
}
