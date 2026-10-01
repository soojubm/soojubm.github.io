import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { TooltipPlacement } from '@/components/overlay/tooltip/tooltip'

import { tooltipBubbleStyles } from '@/components/overlay/tooltip/tooltip.styles'
import '@/components/common'
import { PortalController } from '@/controllers/portal-controller'

/**
 * mm-tooltip이 트리거 곁에 띄우는 말풍선 표면.
 * mm-toast처럼 portal 컨테이너로 옮겨져, 트리거가 스크롤 영역이나 transform·contain을 가진 조상 안에 있어도 잘리지 않습니다.
 * 트리거의 자손이 아니므로 위치는 기준 요소(anchor)의 화면 좌표를 재어 정하고, 열려 있는 동안 스크롤·리사이즈를 따라갑니다.
 * 열림 상태와 내용은 트리거를 소유한 mm-tooltip이 채웁니다.
 */
@customElement('mm-tooltip-bubble')
export class TooltipBubble extends LitElement {
  static styles = tooltipBubbleStyles
  /** @internal 말풍선을 소유한 mm-tooltip이 채운다. */
  @property({ type: String }) content = ''
  /** @internal 말풍선을 소유한 mm-tooltip이 채운다. */
  @property({ type: String, reflect: true }) placement: TooltipPlacement = 'bottom-start'
  /** @internal 말풍선을 소유한 mm-tooltip이 채운다. */
  @property({ type: Boolean, reflect: true }) open = false
  /** @internal 위치를 재는 기준 요소. 말풍선을 소유한 mm-tooltip이 채운다. */
  @property({ attribute: false }) anchor?: HTMLElement
  private portal = new PortalController(this)

  render() {
    return html`
      <mm-text size="12">${this.content}</mm-text>
    `
  }

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'tooltip')
    window.addEventListener('scroll', this.handleViewportChange, { capture: true, passive: true })
    window.addEventListener('resize', this.handleViewportChange)
  }

  disconnectedCallback() {
    window.removeEventListener('scroll', this.handleViewportChange, { capture: true })
    window.removeEventListener('resize', this.handleViewportChange)
    super.disconnectedCallback()
  }

  protected updated(changedProperties: Map<string, unknown>) {
    if (!changedProperties.has('open') && !changedProperties.has('anchor')) return

    this.measureAnchor()
  }

  private handleViewportChange = () => {
    this.measureAnchor()
  }

  // 놓이는 자리는 placement가 CSS에서 정하고, 여기서는 기준 요소의 화면 좌표만 알린다.
  private measureAnchor() {
    if (!this.open || !this.anchor) return

    const { left, right, bottom } = this.anchor.getBoundingClientRect()
    this.style.setProperty('--tooltip-bubble-anchor-left', `${left}px`)
    this.style.setProperty('--tooltip-bubble-anchor-right', `${right}px`)
    this.style.setProperty('--tooltip-bubble-anchor-bottom', `${bottom}px`)
  }
}
