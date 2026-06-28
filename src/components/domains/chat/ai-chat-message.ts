import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'
import { resetStyles } from '@/stylesheets/shared/reset.styles'
import '@/components/text/text'
import '@/components/icon-button/icon-button'
import '@/components/button/button-group'
import '@/components/flex/flex'
import { emit } from '@/utils/emit'

@customElement('mm-ai-chat-message')
export class AiChatMessage extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
      }

      .time {
        color: var(--color-foreground-light);
      }
    `,
  ]

  @property({ type: String }) datetime = ''
  @property({ type: Boolean, attribute: 'hidden-reactions' }) hiddenReactions = false

  render() {
    return html`
      <mm-flex direction="column" gap="2">
        <slot></slot>
        ${this.datetime
          ? html`
              <mm-text class="time" as="time" size="12" weight="medium">${this.datetime}</mm-text>
            `
          : nothing}
        ${this.renderReactions()}
      </mm-flex>
    `
  }

  private emitReaction(reaction: string) {
    emit(this, 'chat-reaction', { reaction })
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
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-ai-chat-message': AiChatMessage
  }
}
