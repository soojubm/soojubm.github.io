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
export type SheetPlacement = 'center' | 'bottom' | 'left' | 'right'
export type SheetWidth = 'small' | 'medium' | 'large' | 'full'

// 드래그로 내린 거리가 패널 높이의 이 비율을 넘으면 닫힘으로 판정한다.
const DRAG_CLOSE_THRESHOLD_RATIO = 0.25

/**
 * 높이·너비·위치(placement/width/height)와 스크롤 책임(mm-sheet-body)을
 * sheet 컴포넌트 계층에서 일관되게 관리한다.
 */
@customElement('mm-sheet')
class Sheet extends LitElement {
  static styles = [overlaySurfaceStyles, sheetPositionStyles, sheetDragHandleStyles]

  @property({ type: String, reflect: true }) placement: SheetPlacement = 'center'
  @property({ type: String, reflect: true }) width: SheetWidth = 'medium'
  @property({ type: String }) height?: string
  @property({ type: Boolean, reflect: true }) open = false

  @query('.panel') private sheetEl!: HTMLElement

  private dragging = false
  private dragStartY = 0

  private sheet = new SheetController(this, {
    isOpen: () => this.open,
    onDismiss: () => emit(this, 'sheet-close'),
  })

  // 리스너 대상이 호스트 자신이라 portal 이동에도 유지되므로 생성자에서 한 번만 등록한다.
  constructor() {
    super()
    this.addEventListener('sheet-close', this.handleSheetClose)
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
      this.style.removeProperty('--surface-height')
      return
    }

    this.style.setProperty('--surface-height', this.height)
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
export default Sheet
