import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../../../stylesheets/shared/reset.styles'
import { chatBubbleStyles } from '../chat.styles'

/**
 * 상대방/AI가 보낸 메시지 버블. 좌측 정렬.
 */
@customElement('mm-ai-chat-bubble')
export class AiChatBubble extends LitElement {
  @property({ type: Boolean }) typing = false
  @property({ type: String }) src = ''

  static styles = [resetStyles, chatBubbleStyles]

  private renderTyping() {
    return html`
      <div class="bubble">
        <div class="typing"><span></span><span></span><span></span></div>
      </div>
    `
  }

  private renderImage() {
    return html`
      <div class="bubble is-image">
        <mm-thumbnail src=${this.src} alt="" ratio="4:3"></mm-thumbnail>
      </div>
    `
  }

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
