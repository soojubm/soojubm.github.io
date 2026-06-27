import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '@/stylesheets/shared/reset.styles'
import { chatBubbleStyles } from '@/components/domains/chat/chat.styles'
import { renderImageBubble, renderTypingBubble } from '@/components/domains/chat/bubbles/renderers'

/**
 * 상대방/AI가 보낸 메시지 버블. 좌측 정렬.
 */
@customElement('mm-ai-chat-bubble')
export class AiChatBubble extends LitElement {
  static styles = [resetStyles, chatBubbleStyles]

  @property({ type: Boolean }) typing = false
  @property({ type: String }) src = ''

  render() {
    if (this.typing) return renderTypingBubble()
    if (this.src) return renderImageBubble(this.src)

    return html`
      <div class="bubble">
        <slot></slot>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-ai-chat-bubble': AiChatBubble
  }
}
