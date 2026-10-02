import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'

import type { ChatReasoningFlow } from '@/components/domains/chat/chat-reasoning-flow'

import '@/components/domains/chat/chat-reasoning-flow'
import '@/components/common'
import { ScheduleController } from '@/controllers/schedule-controller'

// 생각 중일 때 flow를 하나씩 넘겨 보여주는 간격.
const FLOW_INTERVAL_MS = 2200

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
  static styles = css`
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
  `
  @property({ type: Boolean }) thinking = false
  @property({ type: String }) duration = ''
  @queryAssignedElements({ selector: 'mm-chat-reasoning-flow', flatten: true })
  private assignedFlows!: ChatReasoningFlow[]
  private flowIndex = 0
  private flowRotation = new ScheduleController(this, () => this.showNextFlow(), {
    delay: FLOW_INTERVAL_MS,
  })

  // role="status"는 암묵적으로 aria-live="polite"라 따로 두지 않는다.
  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'status')
  }

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
    if (changed.has('thinking')) this.handleFlowSlotChange()
  }

  private getFlows() {
    return this.assignedFlows.filter(flow => !flow.hidden)
  }

  private handleFlowSlotChange = () => {
    this.flowRotation.cancel()

    const flows = this.getFlows()
    if (!flows.length) return

    if (this.flowIndex >= flows.length) this.flowIndex = 0
    this.activateFlow(flows)

    if (!this.thinking || flows.length < 2) return

    this.flowRotation.request()
  }

  // 다음 차례를 먼저 다시 예약해, 생각하는 동안 일정한 간격으로 계속 넘긴다.
  private showNextFlow() {
    this.flowRotation.request()

    const flows = this.getFlows()
    if (!flows.length) return

    this.flowIndex = (this.flowIndex + 1) % flows.length
    this.activateFlow(flows)
  }

  private activateFlow(flows: ChatReasoningFlow[]) {
    flows.forEach((flow, index) => {
      flow.active = index === this.flowIndex
    })
  }
}
