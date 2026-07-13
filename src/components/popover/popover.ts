import { LitElement, html } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'

import { popoverStyles } from '@/components/popover/popover.styles'
import { DisclosureController } from '@/controllers/disclosure-controller'
import { emit } from '@/utils/emit'

export type PopoverPlacement = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'

/**
 * anchor 기반 non-modal 레이어 프리미티브.
 * viewport 기준 modal 레이어인 mm-sheet와 달리 backdrop·portal·스크롤 잠금 없이
 * 트리거에 앵커되어 떠 있는 패널 표면만 책임집니다.
 * 트리거를 slot="trigger"로 넣으면 popover가 스스로 positioned 앵커가 되어 별도 래퍼가 필요 없고,
 * 트리거가 없으면 가장 가까운 positioned 조상에 앵커됩니다(외부 트리거는 aria-controls로 연결).
 * 트리거·외부 클릭·ESC 닫기·aria 배관은 DisclosureController가 소유합니다.
 * 연결된 트리거가 없으면(예: mm-select) 소비자가 open을 제어하는 표면으로만 동작합니다.
 * 좌표는 placement prop으로, 크기·여백은 --popover-width·--popover-padding 토큰으로 정합니다.
 * 패널 지오메트리를 밖에서 다듬을 때는 ::part(panel)을 사용합니다.
 */
@customElement('mm-popover')
class Popover extends LitElement {
  static styles = popoverStyles

  @property({ type: Boolean, reflect: true, attribute: 'open' }) isOpen = false
  @property({ type: String, reflect: true }) placement: PopoverPlacement = 'bottom-left'
  @property({ type: String, reflect: true }) width = 'auto'
  /** 트리거 슬롯 존재 여부(스스로 앵커 모드). slotchange가 관리하므로 직접 지정하지 않는다. */
  @property({ type: Boolean, reflect: true, attribute: 'with-trigger' }) withTrigger = false

  @queryAssignedElements({ slot: 'trigger', flatten: true })
  private triggerElements!: HTMLElement[]

  private disclosure = new DisclosureController(this, {
    isOpen: () => this.isOpen,
    setOpen: open => {
      this.isOpen = open
    },
    getTrigger: () => this.triggerElements[0],
    dismissOn: ['outside', 'escape'],
    hasPopup: () => this.getAttribute('role') ?? 'true',
    onDismiss: () => emit(this, 'popoverclose'),
  })

  render() {
    return html`
      <slot name="trigger" @slotchange=${this.syncTriggerSlot}></slot>
      <div class="panel" part="panel">
        <slot></slot>
      </div>
    `
  }

  private syncTriggerSlot = () => {
    this.withTrigger = this.triggerElements.length > 0
  }

  protected updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('width')) this.style.setProperty('--popover-width', this.width)
  }

  open() {
    this.isOpen = true
  }

  close() {
    this.isOpen = false
  }
}

export default Popover
