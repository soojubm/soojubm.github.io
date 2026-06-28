import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'

import { ICON_NAMES, type IconName } from '@/components/icon-button/semantics/icon-names'
import { resetStyles } from '@/stylesheets/shared/reset.styles'
import '@/components/icon/icon'
import '@/components/text/text'

export type ChatReasoningFlowTone = 'thinking' | 'searching' | 'reading' | 'writing'

const toneIconMap: Record<ChatReasoningFlowTone, IconName> = {
  thinking: ICON_NAMES.SPARKS,
  searching: ICON_NAMES.SEARCH,
  reading: ICON_NAMES.BOOK,
  writing: ICON_NAMES.DOCUMENT_CHECK,
}

/**
 * 현재 진행 중인 reasoning 흐름.
 *
 * <mm-chat-reasoning-flow tone="searching" label="관련 자료 탐색">
 *   디자인 토큰 문서를 찾는 중
 * </mm-chat-reasoning-flow>
 */
@customElement('mm-chat-reasoning-flow')
export class ChatReasoningFlow extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
        width: 100%;
        min-width: 0;
      }

      :host([hidden]) {
        display: none;
      }

      .flow {
        display: flex;
        width: 100%;
        gap: var(--space-2);
        align-items: flex-start;
      }

      .icon {
        display: inline-flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        width: 1rem;
        height: 1rem;
        margin-top: var(--space-05);
        color: var(--color-primary);
      }

      .content {
        display: flex;
        flex-direction: column;
        gap: var(--space-05);
        min-width: 0;
      }

      .label {
        font-size: var(--font-size-13, var(--font-size-14));
        font-weight: var(--font-weight-bold);
        line-height: var(--line-height-14, 1.5);
        color: var(--color-foreground);
      }

      .description,
      .slot {
        font-size: var(--font-size-12);
        line-height: var(--line-height-12, 1.5);
        color: var(--color-foreground-light);
      }
    `,
  ]

  @property({ type: Boolean, reflect: true }) active = false
  @property({ type: String }) tone: ChatReasoningFlowTone = 'thinking'
  @property({ type: String }) label = ''
  @property({ type: String }) description = ''
  @property({ type: String }) icon?: IconName

  render() {
    return html`
      <span class="flow">
        <span class="icon">
          <mm-icon name=${this.icon || toneIconMap[this.tone] || ICON_NAMES.SPARKS}></mm-icon>
        </span>
        <span class="content">
          ${this.label
            ? html`
                <mm-text class="label">${this.label}</mm-text>
              `
            : nothing}
          ${this.description
            ? html`
                <mm-text class="description">${this.description}</mm-text>
              `
            : nothing}
          <mm-text class="slot"><slot></slot></mm-text>
        </span>
      </span>
    `
  }
}

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

      .trend {
        display: flex;
        width: fit-content;
        max-width: min(85%, 600px);
        gap: var(--space-2);
        align-items: flex-start;
      }

      .content {
        display: flex;
        flex-direction: column;
        gap: var(--space-1);
        min-width: 0;
      }

      .meta {
        display: flex;
        gap: var(--space-2);
        align-items: baseline;
        min-width: 0;
      }

      .duration {
        overflow: hidden;
        font-size: var(--font-size-12);
        line-height: var(--line-height-12, 1.5);
        color: var(--color-foreground-light);
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .flows {
        display: grid;
        min-width: 0;
      }

      ::slotted(mm-chat-reasoning-flow) {
        grid-area: 1 / 1;
        opacity: 0;
        pointer-events: none;
        transform: translateY(var(--space-1));
        transition: opacity 240ms ease, transform 240ms ease;
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

  @queryAssignedElements({ selector: 'mm-chat-reasoning-flow', flatten: true })
  private assignedFlows!: ChatReasoningFlow[]

  private flowIndex = 0
  private intervalId = 0

  render() {
    return html`
      <div class="trend" role="status" aria-live="polite">
        <span class="content">
          ${this.duration
            ? html`
                <span class="meta">
                  <mm-text class="duration">${this.duration}</mm-text>
                </span>
              `
            : nothing}
          <span class="flows">
            <slot @slotchange=${this.syncFlows}></slot>
          </span>
        </span>
      </div>
    `
  }

  firstUpdated() {
    this.syncFlows()
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('thinking') || changed.has('interval')) {
      this.syncFlows()
    }
  }

  disconnectedCallback() {
    this.stopTransition()
    super.disconnectedCallback()
  }

  private getFlows() {
    return this.assignedFlows.filter(flow => !flow.hidden)
  }

  private syncFlows = () => {
    const flows = this.getFlows()
    if (!flows.length) {
      this.stopTransition()
      return
    }

    if (this.flowIndex >= flows.length) {
      this.flowIndex = 0
    }

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

declare global {
  interface HTMLElementTagNameMap {
    'mm-chat-reasoning': ChatReasoning
    'mm-chat-reasoning-flow': ChatReasoningFlow
  }
}
