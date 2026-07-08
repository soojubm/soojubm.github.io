import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { popoverStyles } from '@/components/popover/popover.styles'
import { DisclosureController } from '@/controllers/disclosure-controller'
import { scrollbarStyles } from '@/stylesheets/shared/scrollbar.styles'
import { emit } from '@/utils/emit'

export type PopoverPlacement = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'

/**
 * anchor 기반 non-modal 레이어 프리미티브.
 * viewport 기준 modal 레이어인 mm-sheet와 달리 backdrop·portal·스크롤 잠금 없이
 * 가장 가까운 positioned 조상을 기준으로 떠 있는 패널 표면만 책임집니다.
 * 트리거·외부 클릭·ESC 닫기·aria 배관은 DisclosureController가 소유하므로, 트리거는 aria-controls로
 * popover를 가리키기만 하면 클릭 토글까지 자동으로 연결됩니다.
 * aria-controls로 연결된 트리거가 없으면(예: mm-select) 소비자가 open을 제어하는 표면으로만 동작합니다.
 * 좌표는 placement prop으로, 크기·여백은 --popover-width·--popover-padding 토큰으로 정합니다.
 */
@customElement('mm-popover')
class Popover extends LitElement {
  static styles = [scrollbarStyles, popoverStyles]

  @property({ type: Boolean, reflect: true, attribute: 'open' }) isOpen = false
  @property({ type: String, reflect: true }) placement: PopoverPlacement = 'bottom-left'
  @property({ type: String, reflect: true }) width = 'auto'

  private disclosure = new DisclosureController(this, {
    isOpen: () => this.isOpen,
    setOpen: open => {
      this.isOpen = open
    },
    dismissOn: ['outside', 'escape'],
    hasPopup: () => this.getAttribute('role') ?? 'true',
    onDismiss: () => emit(this, 'popoverclose'),
  })

  render() {
    return html`
      <slot></slot>
    `
  }

  open() {
    this.isOpen = true
  }

  close() {
    this.isOpen = false
  }
}

export default Popover
