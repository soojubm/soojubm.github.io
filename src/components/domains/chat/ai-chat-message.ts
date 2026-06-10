import { html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ICON_NAMES } from '../../icon-button/semantics/icon-names'
import { ChatMessageBase } from './chat-message'
import '../../icon-button/icon-button'
import '../../button/button-group'

@customElement('mm-ai-chat-message')
export class AiChatMessage extends ChatMessageBase {
  /** AI 메시지 reactions 숨김 */
  @property({ type: Boolean, attribute: 'no-reactions' }) noReactions = false

  private _emitReaction(reaction: string) {
    this.dispatchEvent(
      new CustomEvent('chat-reaction', {
        detail: { reaction },
        bubbles: true,
        composed: true,
      }),
    )
  }

  private renderReactions() {
    if (this.noReactions) return nothing

    return html`
      <mm-button-group>
        <mm-icon-button
          size="small"
          variant="plain"
          icon=${ICON_NAMES.COPY}
          aria-label="복사"
          @click=${() => this._emitReaction('copy')}
        ></mm-icon-button>
        <mm-icon-button
          size="small"
          variant="plain"
          icon=${ICON_NAMES.THUMBS_UP}
          aria-label="좋아요"
          @click=${() => this._emitReaction('like')}
        ></mm-icon-button>
        <mm-icon-button
          size="small"
          variant="plain"
          icon=${ICON_NAMES.DISLIKE}
          aria-label="싫어요"
          @click=${() => this._emitReaction('dislike')}
        ></mm-icon-button>
      </mm-button-group>
    `
  }

  render() {
    return html` ${this.renderMessage()} ${this.renderReactions()} `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-ai-chat-message': AiChatMessage
  }
}
