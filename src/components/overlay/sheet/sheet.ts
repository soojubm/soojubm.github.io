import { LitElement, html, nothing } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'

import {
  sheetPositionStyles,
  overlaySurfaceStyles,
  sheetDragHandleStyles,
} from '@/components/overlay/overlay.styles'
import '@/components/overlay/backdrop/backdrop'
import { SheetController } from '@/controllers/sheet-controller'
import { emit } from '@/utils'
export type SheetPlacement = 'top' | 'bottom' | 'left' | 'right'

// 드래그로 내린 거리가 패널 높이의 이 비율을 넘으면 닫힘으로 판정한다.
const DRAG_CLOSE_THRESHOLD_RATIO = 0.25

/**
 * 높이·위치(placement/height)와 스크롤 책임(mm-sheet-body)을
 * sheet 컴포넌트 계층에서 일관되게 관리한다. `full-width`는 폭 제한을 푼다.
 */
@customElement('mm-sheet')
export class Sheet extends LitElement {
  static styles = [overlaySurfaceStyles, sheetPositionStyles, sheetDragHandleStyles]
  @property({ type: String, attribute: 'aria-modal', reflect: true }) ariaModal = 'true'
  @property({ type: String, reflect: true }) placement: SheetPlacement = 'bottom'
  @property({ type: String }) height?: string
  @property({ type: Boolean, reflect: true, attribute: 'full-width' }) fullWidth = false
  @property({ type: Boolean, reflect: true }) open = false
  @query('.panel') private sheetEl!: HTMLElement
  private dragging = false
  private dragStartY = 0
  private sheet = new SheetController(this, {
    isOpen: () => this.open,
    setOpen: open => {
      this.open = open
    },
    // 시트는 닫아도 잃는 것이 없는 내용을 담으므로 배경 클릭과 ESC로 모두 닫힌다.
    dismissOn: ['backdrop', 'escape'],
    onDismiss: () => emit(this, 'sheet-close'),
  })

  // 리스너 대상이 호스트 자신이라 portal 이동에도 유지되므로 생성자에서 한 번만 등록한다.
  constructor() {
    super()
    this.addEventListener('sheet-close', this.handleSheetClose)
  }

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'dialog')
  }

  private handleSheetClose = () => {
    this.close()
  }

  render() {
    return html`
      <mm-backdrop></mm-backdrop>
      <aside class="panel" ?open=${this.open}>
        ${this.renderDragHandle()}
        <slot></slot>
      </aside>
    `
  }

  private renderDragHandle() {
    if (this.placement !== 'bottom') return nothing

    return html`
      <div
        class="drag-handle"
        aria-hidden="true"
        @pointerdown=${this.handleDragStart}
        @pointermove=${this.handleDragMove}
        @pointerup=${this.handleDragEnd}
        @pointercancel=${this.handleDragEnd}
      ></div>
    `
  }

  private handleDragStart = (e: PointerEvent) => {
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    this.dragging = true
    this.dragStartY = e.clientY
    this.sheetEl.style.transition = 'none'
  }
  private handleDragMove = (e: PointerEvent) => {
    if (!this.dragging) return

    const deltaY = Math.max(0, e.clientY - this.dragStartY)
    this.sheetEl.style.transform = `translateY(${deltaY}px)`
  }
  private handleDragEnd = (e: PointerEvent) => {
    if (!this.dragging) return
    this.dragging = false

    const deltaY = Math.max(0, e.clientY - this.dragStartY)
    this.sheetEl.style.transition = ''
    this.sheetEl.style.transform = ''

    if (deltaY > this.sheetEl.offsetHeight * DRAG_CLOSE_THRESHOLD_RATIO) emit(this, 'sheet-close')
  }

  protected updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('height')) this.syncHeight()
  }

  private syncHeight() {
    if (!this.height) {
      this.style.removeProperty('--overlay-panel-height')
      return
    }

    this.style.setProperty('--overlay-panel-height', this.height)
  }

  show() {
    this.open = true
  }

  close() {
    this.open = false
  }

  toggle() {
    if (this.open) {
      this.close()
      return
    }

    this.show()
  }
}
