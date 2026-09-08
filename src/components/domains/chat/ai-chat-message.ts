import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/common/icon/icon-names'
import { resetStyles } from '@/stylesheets/shared.styles'
import { emit } from '@/utils'

import { renderChatMessageTime } from './chat.helpers'

import '@/components/common/icon-button/icon-button'
import '@/components/common/button/button-group'

@customElement('mm-ai-chat-message')
export class AiChatMessage extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
      }

      ::slotted(mm-ai-chat-bubble) {
        align-self: flex-start;
      }
    `,
  ]

  @property({ type: String }) datetime = ''
  @property({ type: Boolean, attribute: 'hidden-reactions' }) hiddenReactions = false

  render() {
    return html`
      <slot></slot>
      ${renderChatMessageTime(this.datetime)} ${this.renderReactions()}
    `
  }

  private renderReactions() {
    if (this.hiddenReactions) return nothing

    return html`
      <mm-button-group>
        <mm-icon-button
          size="small"
          variant="ghost"
          icon=${ICON_NAMES.COPY}
          aria-label="복사"
          @click=${() => this.emitReaction('copy')}
        ></mm-icon-button>
        <mm-icon-button
          size="small"
          variant="ghost"
          icon=${ICON_NAMES.THUMBS_UP}
          aria-label="좋아요"
          @click=${() => this.emitReaction('like')}
        ></mm-icon-button>
        <mm-icon-button
          size="small"
          variant="ghost"
          icon=${ICON_NAMES.DISLIKE}
          aria-label="싫어요"
          @click=${() => this.emitReaction('dislike')}
        ></mm-icon-button>
      </mm-button-group>
    `
  }

  private emitReaction(reaction: string) {
    emit(this, 'chat-reaction', { reaction })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-ai-chat-message': AiChatMessage
  }
}
