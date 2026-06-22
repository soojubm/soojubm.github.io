import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'
import { ICON_NAMES } from '../../icon-button/semantics/icon-names'
import '../../text/text'
import '../../icon-button/icon-button'
import '../../button/button-group'

@customElement('mm-ai-chat-message')
export class AiChatMessage extends LitElement {
  @property({ type: String }) time = ''
  @property({ type: Boolean, attribute: 'hidden-reactions' }) hiddenReactions = false

  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
      }

      .time {
        color: var(--color-foreground-light);
      }
    `,
  ]

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
    if (this.hiddenReactions) return nothing

    return html`
      <mm-button-group>
        <mm-icon-button
          size="small"
          variant="ghost"
          icon=${ICON_NAMES.COPY}
          aria-label="복사"
          @click=${() => this._emitReaction('copy')}
        ></mm-icon-button>
        <mm-icon-button
          size="small"
          variant="ghost"
          icon=${ICON_NAMES.THUMBS_UP}
          aria-label="좋아요"
          @click=${() => this._emitReaction('like')}
        ></mm-icon-button>
        <mm-icon-button
          size="small"
          variant="ghost"
          icon=${ICON_NAMES.DISLIKE}
          aria-label="싫어요"
          @click=${() => this._emitReaction('dislike')}
        ></mm-icon-button>
      </mm-button-group>
    `
  }

  render() {
    return html`
      <slot></slot>
      ${this.time
        ? html`
            <mm-text class="time" as="time" size="12" weight="medium">${this.time}</mm-text>
          `
        : nothing}
      ${this.renderReactions()}
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-ai-chat-message': AiChatMessage
  }
}
