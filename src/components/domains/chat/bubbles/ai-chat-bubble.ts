import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { renderChatBubbleShell, withChatBubbleImage } from '@/components/domains/chat/chat.helpers'
import { chatBubbleStyles } from '@/components/domains/chat/chat.styles'

@customElement('fff-ai-chat-bubble')
export class AiChatBubble extends withChatBubbleImage(LitElement) {
  static styles = [chatBubbleStyles]

  render() {
    return renderChatBubbleShell(
      this,
      html`
        <slot></slot>
      `,
    )
  }
}
