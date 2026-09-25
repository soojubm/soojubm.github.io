import { LitElement, html } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'

import { overlaySurfaceStyles, popoverPositionStyles } from '@/components/overlay/overlay.styles'
import '@/components/common'
import { DisclosureController } from '@/controllers/disclosure-controller'
import { OutsideClickController } from '@/controllers/outside-click-controller'
import { emit, getDeepActiveElement } from '@/utils'

export type PopoverPlacement = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'

// 열리면 포커스를 받아 방향키로 탐색하는 목록. 방향키 탐색은 이 목록이 소유한다.
const LIST_SELECTOR = 'mm-menu-item-group, mm-select-listbox'

/**
 * viewport 기준 modal 표면(mm-sheet, mm-dialog)와 달리 backdrop·portal·스크롤 잠금 없이 트리거에 앵커되어 떠 있는 패널 표면만 책임집니다.
 * 트리거는 slot="trigger"로 넣으며, popover가 스스로 positioned 앵커가 되어 별도 래퍼가 필요 없습니다.
 * 트리거 토글·aria-expanded 배관은 DisclosureController가, 외부 클릭·ESC 닫기는 popover가 소유합니다.
 * 여는 표면의 종류(aria-haspopup)는 트리거에, role은 안에 넣는 목록 컴포넌트에 둡니다.
 * 좌표는 placement prop으로, 폭·여백은 `--overlay-panel-*` 토큰으로 정합니다.
 */
@customElement('mm-popover')
export class Popover extends LitElement {
  static styles = [overlaySurfaceStyles, popoverPositionStyles]
  @property({ type: Boolean, reflect: true }) open = false
  @property({ type: String, reflect: true }) placement: PopoverPlacement = 'bottom-left'
  @queryAssignedElements({ slot: 'trigger', flatten: true })
  private triggerElements!: HTMLElement[]
  @queryAssignedElements({ flatten: true })
  private contentElements!: HTMLElement[]
  private returnFocusElement?: HTMLElement
  private disclosure = new DisclosureController(this, {
    isOpen: () => this.open,
    setOpen: open => {
      this.open = open
    },
    getTrigger: () => this.triggerElements[0],
  })
  private outsideClick = new OutsideClickController(this, () => this.close(), {
    isActive: () => this.open,
  })

  render() {
    return html`
      <slot name="trigger"></slot>
      <div class="panel">
        <mm-scroll direction="column">
          <slot></slot>
        </mm-scroll>
      </div>
    `
  }

  connectedCallback() {
    super.connectedCallback()
    document.addEventListener('keydown', this.handleDocumentKeydown)
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this.handleDocumentKeydown)
    super.disconnectedCallback()
  }

  protected updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.get('open') === undefined) return

    // 트리거가 자기 펼침 표시를 맞출 수 있게, 열고 닫힐 때마다 알린다.
    emit(this, 'popover-toggle', { open: this.open })

    if (this.open) {
      this.focusList()
      return
    }

    this.restoreFocus()
  }

  close() {
    this.open = false
  }

  private handleDocumentKeydown = (e: KeyboardEvent) => {
    if (e.key !== 'Escape' || !this.open) return
    this.close()
  }

  // 메뉴·목록이 열리면 포커스를 그 안으로 옮기고, 닫힐 때 돌아갈 요소를 기억한다.
  private focusList() {
    this.returnFocusElement = getDeepActiveElement() as HTMLElement | undefined
    this.findList()?.focus()
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

    this.returnFocusElement?.focus()
  }
}
