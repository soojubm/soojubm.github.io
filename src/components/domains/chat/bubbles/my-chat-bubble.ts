import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { renderImageBubble, renderTypingBubble } from '@/components/domains/chat/bubbles/renderers'
import { myChatBubbleStyles } from '@/components/domains/chat/bubbles/styles'
import { chatBubbleStyles } from '@/components/domains/chat/chat.styles'
import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'
import { resetStyles } from '@/stylesheets/shared/reset.styles'
import '@/components/text/text'
import { emit } from '@/utils/emit'

/**
 * 내가 보낸 메시지 버블. 우측 정렬 + primary 색상.
 * 전송 상태(전송됨/읽음)와 전송 실패(재전송)를 표시합니다.
 */
@customElement('mm-my-chat-bubble')
export class MyChatBubble extends LitElement {
  static styles = [resetStyles, chatBubbleStyles, myChatBubbleStyles]

  @property({ type: Boolean }) typing = false
  @property({ type: String }) src = ''
  @property({ type: String }) status = ''
  @property({ type: Boolean, reflect: true }) failed = false

  render() {
    if (this.typing) return renderTypingBubble()
    if (this.src) return renderImageBubble(this.src)

    if (this.failed) {
      return html`
        ${this.renderBubbleBody()}
        <div class="failed-row">
          <mm-text class="failed-status" size="12" role="alert">전송 실패</mm-text>
          <mm-icon-button
            size="small"
            variant="ghost"
            icon=${ICON_NAMES.RETRY}
            aria-label="재전송"
            @click=${this.handleRetry}
          ></mm-icon-button>
        </div>
      `
    }

    return this.renderBubbleBody()
  }

  private handleRetry() {
    emit(this, 'retry')
  }

  private renderBubbleBody() {
    return html`
      <div class="bubble is-my">
        <slot></slot>
        ${this.status && !this.failed
          ? html`
              <mm-text class="status" role="status">${this.status}</mm-text>
            `
          : ''}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-my-chat-bubble': MyChatBubble
  }
}
