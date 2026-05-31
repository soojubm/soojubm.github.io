import { css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ChatBubbleBase } from './chat-bubble'

/**
 * 상대방/AI가 보낸 메시지 버블. 좌측 정렬.
 * 호버 시 리액션(복사·좋아요·싫어요) 아이콘 버튼을 노출합니다.
 */
@customElement('mm-ai-chat-bubble')
export class AiChatBubble extends ChatBubbleBase {
  /** 리액션 버튼 숨김 */
  @property({ type: Boolean }) noReactions = false

  static styles = [
    ...ChatBubbleBase.styles,
    css`
      .row {
        display: flex;
        flex-direction: column;
        gap: var(--space-1);
      }

      .reactions {
        display: flex;
        gap: var(--space-1);
        opacity: 0;
        transition: opacity 0.15s ease;
      }

      :host(:hover) .reactions,
      :host(:focus-within) .reactions {
        opacity: 1;
      }
    `,
  ]

  private emitReaction(reaction: string) {
    this.dispatchEvent(
      new CustomEvent('chat-reaction', {
        detail: { reaction },
        bubbles: true,
        composed: true,
      }),
    )
  }

  render() {
    if (this.typing) return this.renderTyping()
    if (this.src) return this.renderImage()

    return html`
      <div class="row">
        <div class="bubble">
          <slot></slot>
          ${this.time ? html`<time class="time">${this.time}</time>` : ''}
        </div>
        ${this.noReactions
          ? ''
          : html`
              <div class="reactions">
                <mm-icon-button
                  size="small"
                  variant="plain"
                  icon="copy"
                  aria-label="복사"
                  @click=${() => this.emitReaction('copy')}
                ></mm-icon-button>
                <mm-icon-button
                  size="small"
                  variant="plain"
                  icon="thumbs-up"
                  aria-label="좋아요"
                  @click=${() => this.emitReaction('like')}
                ></mm-icon-button>
                <mm-icon-button
                  size="small"
                  variant="plain"
                  icon="thumbs-down"
                  aria-label="싫어요"
                  @click=${() => this.emitReaction('dislike')}
                ></mm-icon-button>
              </div>
            `}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-ai-chat-bubble': AiChatBubble
  }
}
