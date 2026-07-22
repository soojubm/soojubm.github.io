import { LitElement, html, nothing } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'

import { sheetDragHandleStyles, sheetStyles } from '@/components/sheet/sheet.styles'
import { PortalController } from '@/controllers/portal-controller'
import { ScrollLockController } from '@/controllers/scroll-lock-controller'
import { emit } from '@/utils/emit'
export type SheetVariant = 'center' | 'bottom' | 'left' | 'right'
export type SheetWidth = 'small' | 'medium' | 'large' | 'full'

// 드래그로 내린 거리가 시트 높이의 이 비율을 넘으면 닫힘으로 판정한다.
const DRAG_CLOSE_THRESHOLD_RATIO = 0.25

@customElement('mm-sheet')
class Sheet extends LitElement {
  static styles = [sheetStyles, sheetDragHandleStyles]

  @property({ type: String, reflect: true }) variant: SheetVariant = 'center'
  @property({ type: String, reflect: true }) width: SheetWidth = 'medium'
  @property({ type: String }) height?: string
  @property({ type: Boolean, reflect: true, attribute: 'open' }) isOpen = false

  @query('.sheet') private sheetEl!: HTMLElement

  private dragging = false
  private dragStartY = 0

  private scrollLock = new ScrollLockController(this)
  private portal = new PortalController(this, {
    isActive: () => this.isOpen,
    root: () => document.getElementById('sheet-page-root') ?? document.body,
  })

  // 리스너 대상이 호스트 자신이라 portal 이동에도 유지되므로 생성자에서 한 번만 등록한다.
  constructor() {
    super()
    this.addEventListener('sheetclose', this.handleSheetClose)
    this.addEventListener('click', this.handleBackdropClick)
  }

  private handleSheetClose = () => {
    this.close()
  }

  render() {
    return html`
      <aside class="sheet" ?open=${this.isOpen}>
        ${this.renderDragHandle()}
        <slot></slot>
      </aside>
    `
  }

  private renderDragHandle() {
    if (this.variant !== 'bottom') return nothing

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

    if (deltaY > this.sheetEl.offsetHeight * DRAG_CLOSE_THRESHOLD_RATIO) emit(this, 'sheetclose')
  }

  /** 호스트(backdrop) 영역 클릭 시 닫는다 */
  private handleBackdropClick = (e: MouseEvent) => {
    if (!this.isOpen) return
    if (e.target === this) emit(this, 'sheetclose')
  }

  protected updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('height')) this.syncHeight()
    if (changedProperties.has('isOpen')) this.syncModal()
  }

  private syncHeight() {
    if (!this.height) {
      this.style.removeProperty('--sheet-height')
      return
    }

    this.style.setProperty('--sheet-height', this.height)
  }

  // portal과 스크롤 잠금을 함께 동기화한다.
  // host를 portal로 옮기면 lifecycle이 재실행되며 스크롤 잠금이 풀리므로,
  // 열 때는 portal 이후에 잠그고 닫을 때는 잠금을 푼 뒤 복원한다.
  private syncModal() {
    if (this.isOpen) {
      this.portal.sync()
      this.scrollLock.set(true)
      return
    }

    this.scrollLock.set(false)
    this.portal.sync()
  }

  open() {
    this.isOpen = true
    this.syncModal()
  }

  close() {
    this.isOpen = false
    this.syncModal()
  }

  toggle() {
    if (this.isOpen) {
      this.close()
      return
    }

    this.open()
  }
}
export default Sheet
