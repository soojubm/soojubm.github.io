import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../shared/reset.styles'

@customElement('mm-chat-bubble')
export class ChatBubble extends LitElement {
  /** 내가 보낸 메시지 */
  @property({ type: Boolean, reflect: true }) mine = false
  /** 타이핑 애니메이션 표시 */
  @property({ type: Boolean }) typing = false
  /** 이미지 src (이미지 버블) */
  @property({ type: String }) src = ''
  /** 전송 상태 (예: "전송됨", "읽음") */
  @property({ type: String }) status = ''
  /** 메시지 시간 */
  @property({ type: String }) time = ''

  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
        justify-content: flex-start;
      }

      :host([mine]) {
        justify-content: flex-end;
      }

      .bubble {
        position: relative;
        width: fit-content;
        max-width: min(85%, 600px);
        padding: var(--space-3) var(--space-4);
        border-radius: 1rem;
        border-top-left-radius: var(--radius);
        background-color: var(--color-background-subtle);
        font-size: var(--font-size-14);
        line-height: var(--line-height-14);
        box-sizing: border-box;
      }

      :host([mine]) .bubble {
        border-radius: 1rem;
        border-top-right-radius: var(--radius);
        background: var(--color-primary);
        color: var(--color-foreground-on-solid);
      }

      /* 이미지 버블 */
      .bubble.is-image {
        padding: 0;
        background: none;
        overflow: hidden;
        border-radius: var(--radius);
      }

      .bubble.is-image img {
        width: 100%;
        display: block;
        border-radius: var(--radius);
      }

      /* 타이핑 애니메이션 */
      .typing {
        display: flex;
        align-items: center;
        gap: var(--space-1);
        padding: var(--space-3) var(--space-4);
      }

      .typing span {
        display: block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--color-foreground-light);
        animation: bounce 1.2s infinite ease-in-out;
      }

      :host([mine]) .typing span {
        background: var(--color-foreground-on-solid);
      }

      .typing span:nth-child(1) {
        animation-delay: 0s;
      }
      .typing span:nth-child(2) {
        animation-delay: 0.2s;
      }
      .typing span:nth-child(3) {
        animation-delay: 0.4s;
      }

      @keyframes bounce {
        0%,
        60%,
        100% {
          transform: translateY(0);
        }
        30% {
          transform: translateY(-6px);
        }
      }

      .status {
        display: block;
        margin-top: var(--space-1);
        font-size: var(--font-size-12);
        color: var(--color-foreground-light);
        text-align: right;
      }

      :host([mine]) .status {
        color: color-mix(in srgb, var(--color-foreground-on-solid) 70%, transparent);
      }

      .time {
        display: block;
        margin-top: var(--space-1);
        font-size: var(--font-size-12);
        color: var(--color-foreground-light);
      }
    `,
  ]

  render() {
    if (this.typing) {
      return html`
        <div class="bubble">
          <div class="typing"><span></span><span></span><span></span></div>
        </div>
      `
    }

    if (this.src) {
      return html`
        <div class="bubble is-image">
          <img src=${this.src} alt="" />
        </div>
      `
    }

    return html`
      <div class="bubble">
        <slot></slot>
        ${this.status ? html`<span class="status" role="status">${this.status}</span>` : ''}
        ${this.time ? html`<time class="time">${this.time}</time>` : ''}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-chat-bubble': ChatBubble
  }
}
