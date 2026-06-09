import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'
import { ICON_NAMES } from '../../icon-button/semantics/icon-names'
import '../../icon-button/icon-button'
import '../../button/button-group'

@customElement('mm-chat-message')
export class ChatMessage extends LitElement {
  /** 내가 보낸 메시지 그룹 */
  @property({ type: Boolean, reflect: true }) mine = false
  /** AI 메시지 reactions 숨김 */
  @property({ type: Boolean }) noReactions = false

  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
      }

      :host([mine]) {
        align-items: flex-end;
      }

      :host([mine]) mm-button-group {
        display: none;
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

  render() {
    return html`
      <slot></slot>
      ${!this.mine && !this.noReactions
        ? html`
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
        : nothing}
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-chat-message': ChatMessage
  }
}
