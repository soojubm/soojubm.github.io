import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { chatBubbleStyles } from '@/components/domains/chat/chat.styles'
import { resetStyles } from '@/stylesheets/shared/reset.styles'

import { renderChatBubbleShell, withChatBubbleImage } from '../chat.helpers'

/**
 * 상대방/AI가 보낸 메시지 버블. 좌측 정렬.
 */
@customElement('mm-ai-chat-bubble')
export class AiChatBubble extends withChatBubbleImage(LitElement) {
  static styles = [resetStyles, chatBubbleStyles]

  render() {
    return renderChatBubbleShell(
      this.typing,
      this.src,
      html`
        <slot></slot>
      `,
    )
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-ai-chat-bubble': AiChatBubble
  }
}
