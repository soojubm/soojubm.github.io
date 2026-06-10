import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ICON_NAMES } from '../../../icon-button/semantics/icon-names'
import { ChatBubbleBase } from './chat-bubble'
import { myChatBubbleStyles } from './styles'
import '../../../text/text'

/**
 * 내가 보낸 메시지 버블. 우측 정렬 + primary 색상.
 * 전송 상태(전송됨/읽음)와 전송 실패(재전송)를 표시합니다.
 */
@customElement('mm-my-chat-bubble')
export class MyChatBubble extends ChatBubbleBase {
  /** 전송 상태 (예: "전송됨", "읽음") */
  @property({ type: String }) status = ''
  /** 전송 실패 상태 */
  @property({ type: Boolean, reflect: true }) failed = false

  static styles = [...ChatBubbleBase.styles, myChatBubbleStyles]

  private handleRetry() {
    this.dispatchEvent(new CustomEvent('retry', { bubbles: true, composed: true }))
  }

  private renderBubbleBody() {
    return html`
      <div class="bubble is-my">
        <slot></slot>
        ${this.status && !this.failed
          ? html`<span class="status" role="status">${this.status}</span>`
          : ''}
      </div>
    `
  }

  render() {
    if (this.typing) return this.renderTyping()
    if (this.src) return this.renderImage()

    if (this.failed) {
      return html`
        ${this.renderBubbleBody()}
        <div class="failed-row">
          <mm-text class="failed-status" size="12" role="alert">전송 실패</mm-text>
          <mm-icon-button
            size="small"
            variant="plain"
            icon=${ICON_NAMES.RETRY}
            aria-label="재전송"
            @click=${this.handleRetry}
          ></mm-icon-button>
        </div>
      `
    }

    return this.renderBubbleBody()
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-my-chat-bubble': MyChatBubble
  }
}
