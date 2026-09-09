import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'

import type { ChatReasoningFlow } from '@/components/domains/chat/chat-reasoning-flow'

import { resetStyles } from '@/stylesheets/shared.styles'
import '@/components/domains/chat/chat-reasoning-flow'
import '@/components/common/text/text'

/**
 * AI의 현재 상황만 보여주는 reasoning 컨테이너.
 * 접힘/펼침과 단계형 이력 대신 현재 노출할 flow 하나를 슬롯으로 받습니다.
 *
 * <mm-chat-reasoning thinking>
 *   <mm-chat-reasoning-flow label="관련 자료 탐색">토큰 파일 검색 중</mm-chat-reasoning-flow>
 * </mm-chat-reasoning>
 */
@customElement('mm-chat-reasoning')
export class ChatReasoning extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
      }

      ::slotted(mm-chat-reasoning-flow) {
        grid-area: 1 / 1;
        opacity: 0;
        pointer-events: none;
        transform: translateY(var(--space-1));
        transition: opacity var(--transition-duration) var(--transition-easing),
          transform var(--transition-duration) var(--transition-easing);
      }

      ::slotted(mm-chat-reasoning-flow[active]) {
        opacity: 1;
        pointer-events: auto;
        transform: translateY(0);
      }
    `,
  ]

  @property({ type: Boolean }) thinking = false
  @property({ type: String }) duration = ''
  @property({ type: Number }) interval = 2200
  @property({ type: String, reflect: true }) role = 'status'
  @property({ type: String, attribute: 'aria-live', reflect: true }) ariaLive = 'polite'

  @queryAssignedElements({ selector: 'mm-chat-reasoning-flow', flatten: true })
  private assignedFlows!: ChatReasoningFlow[]

  private flowIndex = 0
  private intervalId = 0

  render() {
    return html`
      ${this.renderDuration()}
      <span>
        <slot @slotchange=${this.handleFlowSlotChange}></slot>
      </span>
    `
  }

  private renderDuration() {
    if (!this.duration) return nothing

    return html`
      <mm-text size="12" color="light">${this.duration}</mm-text>
    `
  }

  firstUpdated() {
    this.handleFlowSlotChange()
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('thinking') || changed.has('interval')) this.handleFlowSlotChange()
  }

  disconnectedCallback() {
    this.stopTransition()
    super.disconnectedCallback()
  }

  private getFlows() {
    return this.assignedFlows.filter(flow => !flow.hidden)
  }

  private handleFlowSlotChange = () => {
    const flows = this.getFlows()
    if (!flows.length) {
      this.stopTransition()
      return
    }

    if (this.flowIndex >= flows.length) this.flowIndex = 0

    this.activateFlow(flows)
    this.stopTransition()

    if (!this.thinking || flows.length < 2) return

    this.intervalId = window.setInterval(() => {
      const currentFlows = this.getFlows()
      if (!currentFlows.length) return

      this.flowIndex = (this.flowIndex + 1) % currentFlows.length
      this.activateFlow(currentFlows)
    }, this.interval)
  }

  private activateFlow(flows: ChatReasoningFlow[]) {
    flows.forEach((flow, index) => {
      flow.active = index === this.flowIndex
    })
  }

  private stopTransition() {
    if (!this.intervalId) return

    window.clearInterval(this.intervalId)
    this.intervalId = 0
  }
}
