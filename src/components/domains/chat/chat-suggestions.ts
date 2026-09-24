import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import '@/components/common/scroll/scroll'

/**
 * 채팅 입력 추천 버튼 그룹. 가로 스크롤 가능한 quick-reply 영역.
 * 스크롤과 양 끝의 흐림·넘김 버튼은 mm-scroll(row)이 소유한다.
 *
 * <mm-chat-suggestions>
 *   <mm-chat-suggestion>네, 좋아요</mm-chat-suggestion>
 *   <mm-chat-suggestion>다시 보기</mm-chat-suggestion>
 * </mm-chat-suggestions>
 */
@customElement('mm-chat-suggestions')
export class ChatSuggestions extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    ::slotted(mm-chat-suggestion) {
      flex-shrink: 0;
    }
  `

  render() {
    return html`
      <mm-scroll gap="2" hide-scrollbar>
        <slot></slot>
      </mm-scroll>
    `
  }
}
