import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import {
  chatBubbleStyles,
  participantChatBubbleStyles,
} from '@/components/domains/chat/chat.styles'
import { resetStyles } from '@/stylesheets/shared.styles'

import { renderChatBubbleShell, withChatBubbleImage } from '../chat.helpers'

/**
 * 다중 채팅 참여자가 보낸 메시지 버블. 좌측 정렬 + subtle 배경.
 */
@customElement('mm-participant-chat-bubble')
export class ParticipantChatBubble extends withChatBubbleImage(LitElement) {
  static styles = [resetStyles, chatBubbleStyles, participantChatBubbleStyles]

  render() {
    return renderChatBubbleShell(
      this,
      html`
        <slot></slot>
      `,
    )
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-participant-chat-bubble': ParticipantChatBubble
  }
}
