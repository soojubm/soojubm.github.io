import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'

/**
 * 채팅 화면 레이아웃 컨테이너
 *
 * <mm-chat-room>
 *   <mm-chat-header>...</mm-chat-header>
 *   <mm-chat-body>...</mm-chat-body>
 *   <mm-chat-footer>...</mm-chat-footer>
 * </mm-chat-room>
 */
@customElement('mm-chat-room')
export class ChatRoom extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow: hidden;
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
    'mm-chat-room': ChatRoom
  }
}
