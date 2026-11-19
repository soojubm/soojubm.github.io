import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'

import type {
  ChatReasoningFlow,
  ChatReasoningFlowStatus,
} from '@/components/domains/chat/chat-reasoning-flow'

import '@/components/domains/chat/chat-reasoning-flow'
import '@/components/common'
import { ScheduleController } from '@/controllers/schedule-controller'

// 생각 중일 때 다음 단계로 넘어가는 간격.
const FLOW_INTERVAL_MS = 2200

/**
 * AI의 진행 과정을 한 번에 펼쳐 보여주는 reasoning 컨테이너.
 * 슬롯으로 받은 flow를 왼쪽 인디케이터로 잇고, 지나온 단계·현재 단계·남은 단계를 구분합니다.
 *
 * <mm-chat-reasoning thinking>
 *   <mm-chat-reasoning-flow label="관련 자료 탐색"></mm-chat-reasoning-flow>
 * </mm-chat-reasoning>
 */
@customElement('mm-chat-reasoning')
export class ChatReasoning extends LitElement {
  static styles = css`
    :host {
      display: block;
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
      <slot @slotchange=${this.handleFlowSlotChange}></slot>
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

    if (this.flowIndex >= flows.length) this.flowIndex = flows.length - 1
    this.activateFlow(flows)

    if (!this.thinking || this.flowIndex >= flows.length - 1) return

    this.flowRotation.request()
  }

  // 마지막 단계에 닿을 때까지 일정한 간격으로 다음 단계로 넘긴다.
  private showNextFlow() {
    const flows = this.getFlows()
    if (!flows.length) return

    this.flowIndex = Math.min(this.flowIndex + 1, flows.length - 1)
    this.activateFlow(flows)

    if (this.flowIndex < flows.length - 1) this.flowRotation.request()
  }

  private getFlowStatus(index: number): ChatReasoningFlowStatus {
    if (!this.thinking || index < this.flowIndex) return 'complete'
    if (index === this.flowIndex) return 'current'
    return 'pending'
  }

  private activateFlow(flows: ChatReasoningFlow[]) {
    flows.forEach((flow, index) => {
      flow.status = this.getFlowStatus(index)
    })
  }
}
