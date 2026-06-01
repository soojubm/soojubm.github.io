import { LitElement, css, html } from 'lit'
import { property } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'

/**
 * 채팅 버블 공통 베이스. 직접 사용하지 말고
 * mm-ai-chat-bubble / mm-my-chat-bubble 을 사용합니다.
 */
export class ChatBubbleBase extends LitElement {
  /** 타이핑 애니메이션 표시 */
  @property({ type: Boolean }) typing = false
  /** 이미지 src (이미지 버블) */
  @property({ type: String }) src = ''
  /** 메시지 시간 */
  @property({ type: String }) time = ''

  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
        justify-content: flex-start;
        min-width: -webkit-fill-available;
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
        /* 기본 none, brutal 테마에서 --bubble-border 주입(상속)으로 #000.
           failed 상태는 element-level border로 덮어 danger 보더 유지. */
        border: var(--bubble-border, none);
      }

      /* 이미지 버블 */
      .bubble.is-image {
        padding: 0;
        background: none;
        overflow: hidden;
        border-radius: var(--radius);
      }

      .bubble.is-image mm-thumbnail {
        display: block;
        max-width: 240px;
        border-radius: var(--radius);
        overflow: hidden;
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

      .time {
        display: block;
        margin-top: var(--space-1);
        font-size: var(--font-size-12);
        color: var(--color-foreground-light);
      }
    `,
  ]

  protected renderTyping() {
    return html`
      <div class="bubble">
        <div class="typing"><span></span><span></span><span></span></div>
      </div>
    `
  }

  protected renderImage() {
    return html`
      <div class="bubble is-image">
        <mm-thumbnail src=${this.src} alt="" ratio="4:3"></mm-thumbnail>
        ${this.time ? html`<time class="time">${this.time}</time>` : ''}
      </div>
    `
  }
}
