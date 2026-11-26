import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { resetStyles } from '@/stylesheets/shared.styles'

@customElement('mm-tagline')
export class Tagline extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
      }

      /* 한 번만 쓰는 예외 크기라 타입 스케일 토큰을 새로 만들지 않고 기존 크기에서 파생한다. */
      h1 {
        font-family: var(--font-family-code);
        font-size: calc(var(--font-size-32) * 1.5);
        font-weight: var(--font-weight-bold);
        line-height: 1.25;
      }

      /* 글 속의 줄바꿈(\n)을 그대로 보인다. 마크업의 들여쓰기 줄바꿈이 빈 줄이 되지 않도록 기본은 꺼 둔다. */
      :host([multiline]) h1 {
        white-space: pre-line;
      }

      :host([centered]) h1 {
        text-align: center;
      }

      /* data-reveal을 단 글자는 한 글자씩 왼쪽에서 오른쪽으로 나타난다. 글자 수를 --tagline-chars, 시작 지연을 --tagline-delay로 받는다. */
      ::slotted([data-reveal]) {
        display: inline-block;
        animation: tagline-reveal 1.4s steps(var(--tagline-chars, 1), end)
          var(--tagline-delay, 0.3s) both;
      }

      @keyframes tagline-reveal {
        from {
          clip-path: inset(0 100% 0 0);
        }

        to {
          clip-path: inset(0);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        ::slotted([data-reveal]) {
          animation: none;
        }
      }
    `,
  ]
  @property({ type: Boolean, reflect: true }) centered = false
  @property({ type: Boolean, reflect: true }) multiline = false

  render() {
    return html`
      <h1><slot></slot></h1>
    `
  }
}
