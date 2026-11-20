import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import {
  renderChatMessageFailedActions,
  renderChatMessageTime,
} from '@/components/domains/chat/chat.helpers'
import { emit } from '@/utils'

@customElement('mm-my-chat-message')
export class MyChatMessage extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: var(--space-2);
    }

    .failed-actions {
      display: flex;
      align-items: center;
      gap: var(--space-1);
    }

    ::slotted(mm-my-chat-bubble) {
      align-self: flex-end;
    }

    :host([failed]) ::slotted(mm-my-chat-bubble) {
      --chat-bubble-background-color: color-mix(
        in srgb,
        var(--danger-color) 12%,
        var(--background-color)
      );
      --chat-bubble-border: var(--border-danger);
      --chat-bubble-text-color: var(--foreground-color);
    }
  `
  @property({ type: String }) datetime = ''
  @property({ type: Boolean, reflect: true }) failed = false
  @state() private retryable = false
  private retryListenerCount = 0

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'group')
    if (!this.hasAttribute('aria-label')) this.setAttribute('aria-label', '내 메시지')
  }

  render() {
    return html`
      <slot></slot>
      ${renderChatMessageFailedActions(
        this.failed,
        this.retryable ? this.handleRetryClick : undefined,
      )}
      ${renderChatMessageTime(this.datetime)}
    `
  }

  // 소비자가 retry를 구독할 때만 재전송 버튼을 노출한다.
  override addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void {
    super.addEventListener(type, listener, options)

    if (type !== 'retry') return
    this.retryListenerCount += 1
    this.retryable = true
  }

  override removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
  ): void {
    super.removeEventListener(type, listener, options)

    if (type !== 'retry') return
    this.retryListenerCount = Math.max(0, this.retryListenerCount - 1)
    this.retryable = this.retryListenerCount > 0
  }

  private handleRetryClick = () => emit(this, 'retry')
}
