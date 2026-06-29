import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { chatBubbleStyles } from '@/components/domains/chat/chat.styles'
import { resetStyles } from '@/stylesheets/shared/reset.styles'

import {
  isChatBubbleImage,
  renderChatBubbleImage,
  renderChatTypingIndicator,
} from '../chat.helpers'

/**
 * 상대방/AI가 보낸 메시지 버블. 좌측 정렬.
 */
@customElement('mm-ai-chat-bubble')
export class AiChatBubble extends LitElement {
  static styles = [resetStyles, chatBubbleStyles]

  @property({ type: Boolean }) typing = false
  @property({ type: String }) src = ''

  render() {
    return html`
      ${renderChatTypingIndicator(this.typing)} ${renderChatBubbleImage(this.src, this.typing)}
      ${this.typing || this.src
        ? nothing
        : html`
            <slot></slot>
          `}
    `
  }

  protected willUpdate() {
    this.toggleAttribute('data-image', isChatBubbleImage(this.src, this.typing))
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-ai-chat-bubble': AiChatBubble
  }
}
