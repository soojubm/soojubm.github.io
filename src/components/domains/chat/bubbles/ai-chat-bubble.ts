import { css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { ChatBubbleBase } from './chat-bubble'

/**
 * 상대방/AI가 보낸 메시지 버블. 좌측 정렬.
 * reactions는 mm-chat-message 하단에서 항상 노출됩니다.
 */
@customElement('mm-ai-chat-bubble')
export class AiChatBubble extends ChatBubbleBase {
  static styles = [...ChatBubbleBase.styles, css``]

  render() {
    if (this.typing) return this.renderTyping()
    if (this.src) return this.renderImage()

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
