import { css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ChatBubbleBase } from './chat-bubble'

/**
 * 내가 보낸 메시지 버블. 우측 정렬 + primary 색상.
 * 전송 상태(전송됨/읽음)와 전송 실패(재전송)를 표시합니다.
 */
@customElement('mm-my-chat-bubble')
export class MyChatBubble extends ChatBubbleBase {
  /** 전송 상태 (예: "전송됨", "읽음") */
  @property({ type: String }) status = ''
  /** 전송 실패 상태 */
  @property({ type: Boolean, reflect: true }) failed = false

  static styles = [
    ...ChatBubbleBase.styles,
    css`
      :host {
        justify-content: flex-end;
      }

      .bubble {
        border-radius: 1rem;
        border-top-left-radius: 1rem;
        border-top-right-radius: var(--radius);
        background: var(--color-primary);
        color: var(--color-foreground-on-solid);
      }

      .bubble.is-image {
        background: none;
      }

      .typing span {
        background: var(--color-foreground-on-solid);
      }

      .status {
        display: block;
        margin-top: var(--space-1);
        font-size: var(--font-size-12);
        color: color-mix(in srgb, var(--color-foreground-on-solid) 70%, transparent);
        text-align: right;
      }

      /* 전송 실패 */
      .failed-row {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        justify-content: flex-end;
      }

      :host([failed]) .bubble {
        background: color-mix(in srgb, var(--color-danger) 12%, var(--color-background));
        color: var(--color-foreground);
        border: 1px solid var(--color-danger);
      }

      .failed-status {
        font-size: var(--font-size-12);
        color: var(--color-danger);
        white-space: nowrap;
      }
    `,
  ]

  private handleRetry() {
    this.dispatchEvent(new CustomEvent('retry', { bubbles: true, composed: true }))
  }

  private renderBubbleBody() {
    return html`
      <div class="bubble">
        <slot></slot>
        ${this.status && !this.failed
          ? html`<span class="status" role="status">${this.status}</span>`
          : ''}
        ${this.time ? html`<time class="time">${this.time}</time>` : ''}
      </div>
    `
  }

  render() {
    if (this.typing) return this.renderTyping()
    if (this.src) return this.renderImage()

    if (this.failed) {
      return html`
        <div class="failed-row">
          <span class="failed-status" role="alert">전송 실패</span>
          <mm-icon-button
            size="small"
            variant="plain"
            icon="refresh-double"
            aria-label="재전송"
            @click=${this.handleRetry}
          ></mm-icon-button>
          ${this.renderBubbleBody()}
        </div>
      `
    }

    return this.renderBubbleBody()
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-my-chat-bubble': MyChatBubble
  }
}
