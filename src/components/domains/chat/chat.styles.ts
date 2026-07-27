import { css } from 'lit'

/**
 * 채팅 버블(ai/participant/my-chat-bubble)은 말풍선 표면과 내부 상태(typing/image)만
 * 책임진다. 아바타·이름·시간·정렬 같은 발신자 메타 정보는 message 컴포넌트가 소유한다.
 */
export const chatBubbleStyles = css`
  :host {
    display: block;
    position: relative;
    width: fit-content;
    max-width: min(85%, 600px);
    box-sizing: border-box;
    font-size: var(--font-size-14);
    line-height: var(--line-height-14);

    --bubble-border-radius: var(--radius) var(--radius-large) var(--radius-large)
      var(--radius-large);
    --thumbnail-border-radius: var(--bubble-border-radius);
  }

  :host([image]) {
    padding: 0;
    background: none;
    overflow: hidden;
  }

  :host([image]) mm-thumbnail {
    display: block;
    max-width: 240px;
    overflow: hidden;
  }
`
