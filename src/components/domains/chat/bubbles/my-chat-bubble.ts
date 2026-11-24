import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { renderChatBubbleShell, withChatBubbleImage } from '@/components/domains/chat/chat.helpers'
import { chatBubbleStyles, myChatBubbleStyles } from '@/components/domains/chat/chat.styles'

import '@/components/common'

export type MyChatBubbleStatus = 'sent' | 'read' | 'failed'

const STATUS_LABELS: Record<MyChatBubbleStatus, string> = {
  sent: '전송됨',
  read: '읽음',
  failed: '전송 실패',
}

@customElement('mm-my-chat-bubble')
export class MyChatBubble extends withChatBubbleImage(LitElement) {
  static styles = [chatBubbleStyles, myChatBubbleStyles]
  @property({ type: String, reflect: true }) status?: MyChatBubbleStatus

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
      <mm-text class="status" role=${this.status === 'failed' ? 'alert' : nothing}>
        ${STATUS_LABELS[this.status]}
      </mm-text>
    `
  }
}
