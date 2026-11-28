import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/common'
import { renderChatMessageTime } from '@/components/domains/chat/chat.helpers'
import { EventSubscriptionController } from '@/controllers/event-subscription-controller'
import { emit } from '@/utils'

import '@/components/common'

@customElement('fff-my-chat-message')
export class MyChatMessage extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: var(--space-2);
    }

    ::slotted(fff-my-chat-bubble) {
      align-self: flex-end;
    }
  `
  @property({ type: String }) datetime = ''
  @state() private failed = false
  private readonly retrySubscription = new EventSubscriptionController(this, 'retry')
  // 버블의 status는 자식 attribute라 바뀌어도 이 컴포넌트가 알 수 없으므로 직접 지켜본다.
  private readonly statusObserver = new MutationObserver(() => this.updateFailed())

  connectedCallback() {
    super.connectedCallback()
    this.statusObserver.observe(this, {
      attributes: true,
      attributeFilter: ['status'],
      subtree: true,
    })
    this.setAttribute('role', 'group')
    if (!this.hasAttribute('aria-label')) this.setAttribute('aria-label', '내 메시지')
  }

  disconnectedCallback() {
    this.statusObserver.disconnect()
    super.disconnectedCallback()
  }

  render() {
    return html`
      <slot @slotchange=${this.handleSlotChange}></slot>
      ${this.renderRetryButton()} ${renderChatMessageTime(this.datetime)}
    `
  }

  private renderRetryButton() {
    if (!this.retrySubscription.subscribed || !this.failed) return nothing

    return html`
      <fff-icon-button
        size="small"
        variant="ghost"
        icon=${ICON_NAMES.RETRY}
        aria-label="재전송"
        @click=${this.handleRetryClick}
      ></fff-icon-button>
    `
  }

  private updateFailed() {
    this.failed = !!this.querySelector(':scope > fff-my-chat-bubble[status="failed"]')
  }

  private handleSlotChange() {
    this.updateFailed()
  }

  private handleRetryClick = () => {
    emit(this, 'retry')
  }
}
