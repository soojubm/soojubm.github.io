import { LitElement, html } from 'lit'
import { property } from 'lit/decorators.js'
import { resetStyles } from '../../../../stylesheets/shared/reset.styles'
import { chatBubbleStyles } from '../chat.styles'

/**
 * 채팅 버블 공통 베이스. 직접 사용하지 말고
 * mm-ai-chat-bubble / mm-my-chat-bubble 을 사용합니다.
 */
export class ChatBubbleBase extends LitElement {
  /** 타이핑 애니메이션 표시 */
  @property({ type: Boolean }) typing = false
  /** 이미지 src (이미지 버블) */
  @property({ type: String }) src = ''

  static styles = [resetStyles, chatBubbleStyles]

  protected renderTyping() {
    return html`
      <div class="bubble">
        <div class="typing"><span></span><span></span><span></span></div>
      </div>
    `
  }

  protected renderImage() {
    return html`
      <div class="bubble is-image">
        <mm-thumbnail src=${this.src} alt="" ratio="4:3"></mm-thumbnail>
      </div>
    `
  }
}
