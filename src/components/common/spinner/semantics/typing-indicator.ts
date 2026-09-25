import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { dotSizes, dotStyles } from '@/components/common/dot/dot.styles'

/**
 * 입력 중(typing)·진행 중 상태를 나타내는 3-dot 모션.
 * 채팅 입력 표시, 응답 대기 등에 사용합니다.
 */
@customElement('mm-typing-indicator')
export class TypingIndicator extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      gap: var(--space-1);
    }

    /* 점은 dot 계열의 크기 단계에서 고르고, 색은 놓인 자리의 글자색을 따른다. */
    span {
      ${dotStyles}
      --dot-size: ${unsafeCSS(dotSizes['6'])};
      --dot-background-color: currentColor;

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
  `
  @property({ type: String, attribute: 'aria-label', reflect: true }) ariaLabel = '입력 중'

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'status')
  }

  render() {
    return html`
      <span></span>
      <span></span>
      <span></span>
    `
  }
}
