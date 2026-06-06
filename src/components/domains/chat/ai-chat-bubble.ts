import { css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { ICON_NAMES } from '../../icon-button/semantics/icon-names'
import { ChatBubbleBase } from './chat-bubble'

/**
 * 상대방/AI가 보낸 메시지 버블. 좌측 정렬.
 * 호버 시 리액션(복사·좋아요·싫어요) 아이콘 버튼을 노출합니다.
 */
@customElement('mm-ai-chat-bubble')
export class AiChatBubble extends ChatBubbleBase {
  /** 리액션 버튼 숨김 */
  @property({ type: Boolean }) noReactions = false
  @state() private isActionsOpen = false

  static styles = [
    ...ChatBubbleBase.styles,
    css`
      .reactions {
        display: flex;
        position: absolute;
        left: 0;
        bottom: calc(var(--size-small) * -1 - var(--space-2));
        z-index: var(--zindex-popover);
        gap: var(--space-1);
        padding: var(--space-1);
        border: var(--border);
        border-radius: var(--radius);
        background: var(--color-background);
        box-shadow: var(--shadow);
      }

      .bubble {
        cursor: pointer;
      }
    `,
  ]

  connectedCallback() {
    super.connectedCallback()
    document.addEventListener('pointerdown', this.closeActionsOnOutsideClick)
  }

  disconnectedCallback() {
    document.removeEventListener('pointerdown', this.closeActionsOnOutsideClick)
    super.disconnectedCallback()
  }

  private closeActionsOnOutsideClick = (event: PointerEvent) => {
    if (event.composedPath().includes(this)) return

    this.isActionsOpen = false
  }

  private toggleActions(event: Event) {
    if (this.noReactions) return

    event.stopPropagation()
    this.isActionsOpen = !this.isActionsOpen
  }

  private emitReaction(event: Event, reaction: string) {
    event.stopPropagation()
    this.isActionsOpen = false

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
      <div
        class="bubble"
        @click=${this.toggleActions}
        aria-haspopup="menu"
        aria-expanded=${this.isActionsOpen ? 'true' : 'false'}
      >
        <slot></slot>
        ${this.time ? html`<time class="time">${this.time}</time>` : ''}
      </div>
      ${this.noReactions || !this.isActionsOpen
        ? ''
        : html`
            <div class="reactions" role="menu" aria-label="메시지 피드백">
              <mm-icon-button
                size="small"
                variant="plain"
                icon=${ICON_NAMES.COPY}
                aria-label="복사"
                @click=${(event: Event) => this.emitReaction(event, 'copy')}
              ></mm-icon-button>
              <mm-icon-button
                size="small"
                variant="plain"
                icon=${ICON_NAMES.THUMBS_UP}
                aria-label="좋아요"
                @click=${(event: Event) => this.emitReaction(event, 'like')}
              ></mm-icon-button>
              <mm-icon-button
                size="small"
                variant="plain"
                icon=${ICON_NAMES.DISLIKE}
                aria-label="싫어요"
                @click=${(event: Event) => this.emitReaction(event, 'dislike')}
              ></mm-icon-button>
            </div>
          `}
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-ai-chat-bubble': AiChatBubble
  }
}
