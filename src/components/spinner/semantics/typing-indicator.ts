import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'
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
      }

      .dots {
        display: flex;
        gap: var(--space-1);
      }

      .dots span {
        display: block;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: var(--typing-color, var(--color-foreground));
        animation: chatting 0.6s 0s ease infinite;
      }

      .dots span:nth-of-type(2) {
        animation-delay: var(--animation-delay-first);
      }
      .dots span:nth-of-type(3) {
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
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = '입력 중'

  render() {
    const dotsStyle = {
      '--typing-color': this.color,
    }

    return html`
      <div class="dots" role="status" aria-label=${this.ariaLabel} style=${styleMap(dotsStyle)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-typing-indicator': TypingIndicator
  }
}
