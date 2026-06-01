import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'

/**
 * 채팅 입력 추천 버튼 그룹. 가로 스크롤 가능한 quick-reply 영역.
 *
 * <mm-chat-input-suggestions>
 *   <mm-chat-input-suggestion>네, 좋아요</mm-chat-input-suggestion>
 *   <mm-chat-input-suggestion>다시 보기</mm-chat-input-suggestion>
 * </mm-chat-input-suggestions>
 */
@customElement('mm-chat-input-suggestions')
export class ChatInputSuggestions extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
        gap: var(--space-2);
        flex-wrap: nowrap;
        overflow-x: auto;
        scroll-behavior: smooth;
        padding: var(--space-1) 0;
        -ms-overflow-style: none;
        scrollbar-width: none;
      }

      :host::-webkit-scrollbar {
        display: none;
      }

      ::slotted(mm-chat-input-suggestion) {
        flex-shrink: 0;
      }
    `,
  ]

  render() {
    return html`<slot></slot>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-chat-input-suggestions': ChatInputSuggestions
  }
}
