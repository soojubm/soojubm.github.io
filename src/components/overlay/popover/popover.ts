import { LitElement, html } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'

import { popoverStyles } from '@/components/overlay/popover/popover.styles'
import '@/components/common/scroll/scroll'
import { DisclosureController } from '@/controllers/disclosure-controller'
import { emit } from '@/utils'

export type PopoverPlacement = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'

/**
 * viewport 기준 modal 레이어(mm-layer, mm-dialog)와 달리 backdrop·portal·스크롤 잠금 없이 트리거에 앵커되어 떠 있는 패널 표면만 책임집니다.
 * 트리거는 slot="trigger"로 넣으며, popover가 스스로 positioned 앵커가 되어 별도 래퍼가 필요 없습니다.
 * 트리거·외부 클릭·ESC 닫기·aria 배관은 DisclosureController가 소유합니다.
 * 좌표는 placement prop으로, 폭은 width prop, 여백은 padding prop으로 정합니다.
 * 패널 지오메트리를 밖에서 다듬을 때는 ::part(panel)을 사용합니다.
 */
@customElement('mm-popover')
class Popover extends LitElement {
  static styles = popoverStyles

  @property({ type: Boolean, reflect: true }) open = false
  @property({ type: String, reflect: true }) placement: PopoverPlacement = 'bottom-left'
  @property({ type: String }) width?: string
  @property({ type: String }) padding?: string

  @queryAssignedElements({ slot: 'trigger', flatten: true })
  private triggerElements!: HTMLElement[]

  private disclosure = new DisclosureController(this, {
    isOpen: () => this.open,
    setOpen: open => {
      this.open = open
    },
    getTrigger: () => this.triggerElements[0],
    dismissOn: ['outside', 'escape'],
    hasPopup: () => this.getAttribute('role') ?? 'true',
    onDismiss: () => emit(this, 'popoverclose'),
  })

  render() {
    return html`
      <slot name="trigger"></slot>
      <div class="panel" part="panel">
        <mm-scroll direction="column">
          <slot></slot>
        </mm-scroll>
      </div>
    `
  }

  protected updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('width')) {
      if (this.width) this.style.setProperty('--popover-width', this.width)
      else this.style.removeProperty('--popover-width')
    }
    if (changedProperties.has('padding')) {
      if (this.padding) this.style.setProperty('--popover-padding', this.padding)
      else this.style.removeProperty('--popover-padding')
    }
  }

  close() {
    this.open = false
  }
}

export default Popover
