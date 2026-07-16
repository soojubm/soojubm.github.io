import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { resetStyles } from '@/stylesheets/shared/reset.styles'
import '@/components/flex/flex'

@customElement('mm-chat-footer')
export class ChatFooter extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        position: absolute;
        inset-inline: 0;
        bottom: 0;
        z-index: 1;
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
        gap: var(--space-3);
        padding: var(--space-4);
        box-sizing: border-box;
      }

      /* 화면 전체를 덮는 스크롤 위로 프롬프트 입력이 떠서
         chat-feed가 그 아래로 깔리고 글래스모피즘이 성립한다. */
      :host > * {
        width: 100%;
        max-width: var(--layout-width-small, 800px);
        margin-inline: auto;
      }
    `,
  ]

  render() {
    return html`
      <slot></slot>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-chat-footer': ChatFooter
  }
}
