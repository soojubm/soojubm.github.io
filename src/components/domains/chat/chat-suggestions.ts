import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { horizontalScrollRowStyles } from '@/stylesheets/shared/horizontal-scroll-row.styles'
import { resetStyles } from '@/stylesheets/shared/reset.styles'

/**
 * 채팅 입력 추천 버튼 그룹. 가로 스크롤 가능한 quick-reply 영역.
 *
 * <mm-chat-suggestions>
 *   <mm-chat-suggestion>네, 좋아요</mm-chat-suggestion>
 *   <mm-chat-suggestion>다시 보기</mm-chat-suggestion>
 * </mm-chat-suggestions>
 */
@customElement('mm-chat-suggestions')
export class ChatSuggestions extends LitElement {
  static styles = [
    resetStyles,
    horizontalScrollRowStyles,
    css`
      ::slotted(mm-chat-suggestion) {
        flex-shrink: 0;
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
    'mm-chat-suggestions': ChatSuggestions
  }
}
