import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { resetStyles } from '@/stylesheets/shared/reset.styles'

/**
 * 입력 중(typing)·진행 중 상태를 나타내는 3-dot 모션.
 * 채팅 입력 표시, 응답 대기 등에 사용합니다.
 */
@customElement('mm-typing-indicator')
export class TypingIndicator extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: inline-flex;
        gap: var(--space-1);
        --typing-background-color: var(--color-foreground);
      }

      span {
        display: block;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: var(--typing-background-color, var(--color-foreground));
        animation: chatting 0.6s 0s ease infinite;
      }

      span:nth-of-type(2) {
        animation-delay: var(--animation-delay-first);
      }
      span:nth-of-type(3) {
        animation-delay: var(--animation-delay-second);
      }

      @keyframes chatting {
        0% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(0.125rem);
        }
        100% {
          transform: translateY(0);
        }
      }
    `,
  ]

  @property({ type: String }) color = 'var(--color-foreground)'
  @property({ type: String, reflect: true }) role = 'status'
  @property({ type: String, attribute: 'aria-label', reflect: true }) ariaLabel = '입력 중'

  render() {
    return html`
      <span></span>
      <span></span>
      <span></span>
    `
  }

  protected updated(changedProperties: Map<string, unknown>) {
    if (!changedProperties.has('color')) return

    this.style.setProperty('--typing-background-color', this.color)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-typing-indicator': TypingIndicator
  }
}
