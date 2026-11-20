import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/common'
import { renderChatMessageTime } from '@/components/domains/chat/chat.helpers'
import { emit } from '@/utils'

import '@/components/common'

@customElement('mm-ai-chat-message')
export class AiChatMessage extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }

    ::slotted(mm-ai-chat-bubble) {
      align-self: flex-start;
    }
  `
  @property({ type: String }) datetime = ''
  @state() private reactable = false
  @state() private pressedReaction: 'like' | 'dislike' | null = null
  private reactionListenerCount = 0

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'group')
    if (!this.hasAttribute('aria-label')) this.setAttribute('aria-label', 'AI의 메시지')
  }

  render() {
    return html`
      <slot></slot>
      ${renderChatMessageTime(this.datetime)} ${this.renderReactions()}
    `
  }

  private renderReactions() {
    if (!this.reactable) return nothing

    return html`
      <mm-button-group>
        <mm-icon-button
          size="small"
          variant="ghost"
          icon=${ICON_NAMES.COPY}
          aria-label="복사"
          @click=${this.handleCopyClick}
        ></mm-icon-button>
        <mm-icon-button
          size="small"
          variant="ghost"
          icon=${ICON_NAMES.THUMBS_UP}
          aria-label="좋아요"
          aria-pressed=${this.pressedReaction === 'like' ? 'true' : 'false'}
          @click=${this.handleLikeClick}
        ></mm-icon-button>
        <mm-icon-button
          size="small"
          variant="ghost"
          icon=${ICON_NAMES.DISLIKE}
          aria-label="싫어요"
          aria-pressed=${this.pressedReaction === 'dislike' ? 'true' : 'false'}
          @click=${this.handleDislikeClick}
        ></mm-icon-button>
      </mm-button-group>
    `
  }

  // 소비자가 chat-reaction을 구독할 때만 반응 버튼을 노출한다.
  override addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void {
    super.addEventListener(type, listener, options)

    if (type !== 'chat-reaction') return
    this.reactionListenerCount += 1
    this.reactable = true
  }

  override removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
  ): void {
    super.removeEventListener(type, listener, options)

    if (type !== 'chat-reaction') return
    this.reactionListenerCount = Math.max(0, this.reactionListenerCount - 1)
    this.reactable = this.reactionListenerCount > 0
  }

  private handleCopyClick = () => emit(this, 'chat-reaction', { reaction: 'copy' })
  private handleLikeClick = () => this.toggleReaction('like')
  private handleDislikeClick = () => this.toggleReaction('dislike')

  // 좋아요·싫어요는 둘 중 하나만 눌린 상태로 두고, 같은 버튼을 다시 누르면 해제한다.
  private toggleReaction(reaction: 'like' | 'dislike') {
    this.pressedReaction = this.pressedReaction === reaction ? null : reaction
    emit(this, 'chat-reaction', { reaction, pressed: this.pressedReaction === reaction })
  }
}
