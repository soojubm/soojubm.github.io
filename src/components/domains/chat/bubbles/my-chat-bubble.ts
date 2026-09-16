import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { renderChatBubbleShell, withChatBubbleImage } from '@/components/domains/chat/chat.helpers'
import { chatBubbleStyles, myChatBubbleStyles } from '@/components/domains/chat/chat.styles'

import '@/components/common'

/**
 * 내가 보낸 메시지 버블. 우측 정렬 + primary 색상.
 * 전송 상태(전송됨/읽음)를 표시합니다.
 */
@customElement('mm-my-chat-bubble')
export class MyChatBubble extends withChatBubbleImage(LitElement) {
  static styles = [chatBubbleStyles, myChatBubbleStyles]
  @property({ type: String }) status = ''

  render() {
    return renderChatBubbleShell(
      this,
      html`
        <slot></slot>
        ${this.renderStatus()}
      `,
    )
  }

  private renderStatus() {
    if (!this.status) return nothing

    return html`
      <mm-text class="status" role="status">${this.status}</mm-text>
    `
  }
}
