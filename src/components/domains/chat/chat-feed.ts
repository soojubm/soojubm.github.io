import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { resetStyles } from '@/stylesheets/shared.styles'

@customElement('mm-chat-feed')
export class ChatFeed extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--space-section);
        flex: none;
        width: 100%;
        max-width: 800px;
        /* 하단 여백은 떠 있는 prompt-input 높이만큼 확보해
           마지막 메시지가 입력창 뒤로 가려지지 않게 한다. */
        margin: var(--space-8) auto 0;
        padding: 0 var(--layout-padding-inline);
        padding-block-end: 8rem;
        box-sizing: border-box;
      }
    `,
  ]

  render() {
    return html`
      <slot></slot>
    `
  }
}
