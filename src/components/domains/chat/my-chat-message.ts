import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/common'
import { renderChatMessageTime } from '@/components/domains/chat/chat.helpers'
import { emit } from '@/utils'

import '@/components/common'

/**
 * 내가 보낸 메시지 묶음. 정렬·시간과, 전송에 실패한 버블 아래의 재전송 버튼을 맡는다.
 * 소비자가 retry를 구독할 때만 재전송 버튼을 노출하고, 실패한 버블이 있을 때만 보인다.
 */
@customElement('mm-my-chat-message')
export class MyChatMessage extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: var(--space-2);
    }

    ::slotted(mm-my-chat-bubble) {
      align-self: flex-end;
    }
  `
  @property({ type: String }) datetime = ''
  @state() private retryable = false
  @state() private failed = false
  private retryListenerCount = 0
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
    if (!this.retryable || !this.failed) return nothing

    return html`
      <mm-icon-button
        size="small"
        variant="ghost"
        icon=${ICON_NAMES.RETRY}
        aria-label="재전송"
        @click=${this.handleRetryClick}
      ></mm-icon-button>
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

  private updateFailed() {
    this.failed = !!this.querySelector(':scope > mm-my-chat-bubble[status="failed"]')
  }

  private handleSlotChange() {
    this.updateFailed()
  }

  private handleRetryClick = () => {
    emit(this, 'retry')
  }
}
