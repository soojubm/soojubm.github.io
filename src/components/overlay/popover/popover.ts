import { LitElement, html } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'

import {
  overlaySurfaceStyles,
  popoverPositionStyles,
  type OverlayPlacement,
} from '@/components/overlay/overlay.styles'
import '@/components/common'
import { AnchorController } from '@/controllers/anchor-controller'
import { DisclosureController } from '@/controllers/disclosure-controller'
import { EscapeKeyController } from '@/controllers/escape-key-controller'
import { OutsideClickController } from '@/controllers/outside-click-controller'
import { PortalController } from '@/controllers/portal-controller'
import { getDeepActiveElement } from '@/utils'
import { withOpenState } from '@/utils/open-state'

export type PopoverPlacement = Extract<
  OverlayPlacement,
  'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'
>

// 열리면 포커스를 먼저 받아 방향키로 탐색하는 목록(없으면 autofocus 요소, 그것도 없으면 표면 자체가 받는다).
// 방향키 탐색은 이 목록이 소유한다.
const LIST_SELECTOR = 'mm-menu-item-group, mm-select-listbox'

/**
 * 트리거에 앵커되어 떠 있는 non-modal 표면. mm-sheet처럼 host가 곧 표면이라 portal 컨테이너로 옮겨지고
 * 내용(자식)이 함께 따라가며, backdrop·스크롤 잠금 없이 배경 상호작용을 막지 않습니다.
 * 트리거는 popover 밖에 두고 aria-controls로 이 popover의 id를 가리킵니다. 클릭 토글·aria-expanded 배선은
 * DisclosureController가, 외부 클릭·ESC 닫기는 popover가 소유합니다. portal로 옮겨져도 트리거를 찾도록
 * 선언한 자리의 root에서 찾습니다. 여는 표면의 종류(aria-haspopup)는 트리거에, role은 안에 넣는 목록 컴포넌트에 둡니다.
 * 트리거를 소비자가 직접 배선하는 쪽(mm-select 등)은 aria-controls 대신 `anchor`로 기준 요소를 넘깁니다.
 * 트리거의 자손이 아니므로 위치는 기준 요소의 화면 좌표를 재어 정하고, 열려 있는 동안 스크롤·리사이즈를 따라갑니다.
 * 열리면 포커스를 표면 안으로 옮기고, Tab으로 표면을 벗어나면 닫고 트리거로 돌려보냅니다.
 * 표면이 문서 끝(portal 컨테이너)에 놓여 Tab으로 나가면 트리거 다음 요소가 아니라 엉뚱한 곳에 닿기 때문입니다.
 * 좌표는 placement prop으로, 폭·여백은 `--overlay-panel-*` 토큰으로 정합니다.
 */
@customElement('mm-popover')
export class Popover extends withOpenState(LitElement) {
  static styles = [overlaySurfaceStyles, popoverPositionStyles]
  @property({ type: String, reflect: true }) placement: PopoverPlacement = 'bottom-start'
  /** 위치를 재는 기준 요소. 생략하면 aria-controls로 이 popover를 가리키는 트리거가 기준이다. */
  @property({ attribute: false }) anchor?: HTMLElement
  @queryAssignedElements({ flatten: true })
  private contentElements!: HTMLElement[]
  private returnFocusElement?: HTMLElement
  private portal = new PortalController(this)
  private disclosure = new DisclosureController(this, {
    getRoot: () => this.portal.originRoot,
  })
  private outsideClick = new OutsideClickController(this, () => this.close(), {
    isOpen: () => this.open,
    getSafeElements: () => [this.anchorElement],
  })
  private escapeKey = new EscapeKeyController(this)
  private anchorPosition = new AnchorController(this, {
    getAnchor: () => this.anchorElement,
    isOpen: () => this.open,
    variables: {
      left: '--popover-anchor-left',
      top: '--popover-anchor-top',
      width: '--popover-anchor-width',
      height: '--popover-anchor-height',
    },
  })

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
    this.addEventListener('keydown', this.handleKeydown)
  }

  disconnectedCallback() {
    this.removeEventListener('keydown', this.handleKeydown)
    super.disconnectedCallback()
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

  // portal로 문서 끝에 놓여 Tab으로 밖에 나가면 엉뚱한 곳에 닿으므로, 포커스가 표면을 벗어나면 닫고 트리거로 돌려보낸다.
  // 포커스는 Tab 처리가 끝난 뒤에 옮겨 가므로 한 틱 뒤에 판단한다.
  private handleKeydown = (event: KeyboardEvent) => {
    if (event.key !== 'Tab') return

    setTimeout(() => {
      if (!this.open || this.matches(':focus-within')) return

      this.close()
      this.returnFocus()
    })
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
