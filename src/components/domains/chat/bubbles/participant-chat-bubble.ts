import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { renderChatBubbleShell, withChatBubbleImage } from '@/components/domains/chat/chat.helpers'
import {
  chatBubbleStyles,
  participantChatBubbleStyles,
} from '@/components/domains/chat/chat.styles'

@customElement('fff-participant-chat-bubble')
export class ParticipantChatBubble extends withChatBubbleImage(LitElement) {
  static styles = [chatBubbleStyles, participantChatBubbleStyles]

  render() {
    return renderChatBubbleShell(
      this,
      html`
        <slot></slot>
      `,
    )
  }
}
