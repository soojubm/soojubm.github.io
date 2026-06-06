import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'

/**
 * 채팅 피드(스크롤) + 입력창(하단 고정) 레이아웃 컨테이너
 *
 * <mm-chat-room>
 *   <mm-chat-feed slot="feed">...</mm-chat-feed>
 *   <mm-prompt-input slot="input">...</mm-prompt-input>
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

      .feed {
        flex: 1;
        display: flex;
        overflow: hidden;
        padding: var(--space-4);
      }

      .input {
        flex-shrink: 0;
        padding: var(--space-3) var(--space-4);
        border-top: var(--border);
        background: var(--color-background);
      }
    `,
  ]

  render() {
    return html`
      <div class="feed">
        <slot name="feed"></slot>
      </div>
      <div class="input">
        <slot name="input"></slot>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-chat-room': ChatRoom
  }
}
