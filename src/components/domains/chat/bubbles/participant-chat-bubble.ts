import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { participantChatBubbleStyles } from '@/components/domains/chat/bubbles/styles'
import { chatBubbleStyles } from '@/components/domains/chat/chat.styles'
import { resetStyles } from '@/stylesheets/shared/reset.styles'

import {
  isChatBubbleImage,
  renderChatBubbleImage,
  renderChatTypingIndicator,
} from '../chat.helpers'

/**
 * 다중 채팅 참여자가 보낸 메시지 버블. 좌측 정렬 + subtle 배경.
 */
@customElement('mm-participant-chat-bubble')
export class ParticipantChatBubble extends LitElement {
  static styles = [resetStyles, chatBubbleStyles, participantChatBubbleStyles]

  @property({ type: Boolean }) typing = false
  @property({ type: String }) src = ''

  render() {
    return html`
      ${renderChatTypingIndicator(this.typing)} ${renderChatBubbleImage(this.src, this.typing)}
      ${this.renderMessage()}
    `
  }

  protected willUpdate() {
    this.toggleAttribute('image', isChatBubbleImage(this.src, this.typing))
  }

  private renderMessage() {
    if (this.typing || this.src) return nothing

    return html`
      <slot></slot>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-participant-chat-bubble': ParticipantChatBubble
  }
}
