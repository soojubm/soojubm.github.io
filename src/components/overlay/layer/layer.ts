import { LitElement, html, nothing } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'

import {
  layerPositionStyles,
  overlaySurfaceStyles,
  overlayVisibilityStyles,
} from '@/components/overlay/overlay.styles'
import '@/components/overlay/backdrop/backdrop'
import { LayerController } from '@/controllers/layer-controller'
import { emit } from '@/utils'
export type LayerPlacement = 'center' | 'bottom' | 'left' | 'right'
export type LayerWidth = 'small' | 'medium' | 'large' | 'full'

// 드래그로 내린 거리가 패널 높이의 이 비율을 넘으면 닫힘으로 판정한다.
const DRAG_CLOSE_THRESHOLD_RATIO = 0.25

/**
 * 높이·너비·위치(placement/width/height)와 스크롤 책임(mm-layer-body)을
 * layer 컴포넌트 계층에서 일관되게 관리한다.
 */
@customElement('mm-layer')
class Layer extends LitElement {
  static styles = [overlaySurfaceStyles, overlayVisibilityStyles, layerPositionStyles]

  @property({ type: String, reflect: true }) placement: LayerPlacement = 'center'
  @property({ type: String, reflect: true }) width: LayerWidth = 'medium'
  @property({ type: String }) height?: string
  @property({ type: Boolean, reflect: true }) open = false

  @query('.panel') private layerEl!: HTMLElement

  private dragging = false
  private dragStartY = 0

  private layer = new LayerController(this, {
    isOpen: () => this.open,
    onDismiss: () => emit(this, 'layerclose'),
  })

  // 리스너 대상이 호스트 자신이라 portal 이동에도 유지되므로 생성자에서 한 번만 등록한다.
  constructor() {
    super()
    this.addEventListener('layerclose', this.handleLayerClose)
  }

  private handleLayerClose = () => {
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
    this.layerEl.style.transition = 'none'
  }

  private handleDragMove = (e: PointerEvent) => {
    if (!this.dragging) return

    const deltaY = Math.max(0, e.clientY - this.dragStartY)
    this.layerEl.style.transform = `translateY(${deltaY}px)`
  }

  private handleDragEnd = (e: PointerEvent) => {
    if (!this.dragging) return
    this.dragging = false

    const deltaY = Math.max(0, e.clientY - this.dragStartY)
    this.layerEl.style.transition = ''
    this.layerEl.style.transform = ''

    if (deltaY > this.layerEl.offsetHeight * DRAG_CLOSE_THRESHOLD_RATIO) emit(this, 'layerclose')
  }

  protected updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('height')) this.syncHeight()
  }

  private syncHeight() {
    if (!this.height) {
      this.style.removeProperty('--layer-height')
      return
    }

    this.style.setProperty('--layer-height', this.height)
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
export default Layer
