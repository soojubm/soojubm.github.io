import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { myChatBubbleStyles } from '@/components/domains/chat/bubbles/styles'
import { chatBubbleStyles } from '@/components/domains/chat/chat.styles'
import { resetStyles } from '@/stylesheets/shared/reset.styles'

import {
  isChatBubbleImage,
  renderChatBubbleImage,
  renderChatTypingIndicator,
} from '../chat.helpers'

import '@/components/text/text'

/**
 * 내가 보낸 메시지 버블. 우측 정렬 + primary 색상.
 * 전송 상태(전송됨/읽음)를 표시합니다.
 */
@customElement('mm-my-chat-bubble')
export class MyChatBubble extends LitElement {
  static styles = [resetStyles, chatBubbleStyles, myChatBubbleStyles]

  @property({ type: Boolean }) typing = false
  @property({ type: String }) src = ''
  @property({ type: String }) status = ''

  render() {
    return html`
      ${renderChatTypingIndicator(this.typing, 'var(--color-foreground-on-solid)')}
      ${renderChatBubbleImage(this.src, this.typing)}
      ${this.typing || this.src
        ? nothing
        : html`
            <slot></slot>
            ${this.renderStatus()}
          `}
    `
  }

  protected willUpdate() {
    this.toggleAttribute('image', isChatBubbleImage(this.src, this.typing))
  }

  private renderStatus() {
    if (!this.status) return nothing

    return html`
      <mm-text class="status" role="status">${this.status}</mm-text>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-my-chat-bubble': MyChatBubble
  }
}
