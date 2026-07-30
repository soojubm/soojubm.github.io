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
    line-height: var(--font-line-height-24);

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

/** 말풍선 표면을 갖는 버블(내가·참여자가 보낸 쪽)이 공유하는 여백과 모서리. */
const chatBubbleSurfaceStyles = css`
  :host {
    padding: var(--space-3) var(--space-4);
    border: var(--border-transparent);
    border-radius: var(--bubble-border-radius);
  }
`

export const myChatBubbleStyles = [
  chatBubbleSurfaceStyles,
  css`
    :host {
      --bubble-border-radius: var(--radius-large) var(--radius) var(--radius-large)
        var(--radius-large);
      --thumbnail-border-radius: var(--bubble-border-radius);

      background: var(--color-primary);
      color: var(--foreground-color-on-solid);
    }

    .status {
      display: block;
      margin-top: var(--space-1);
      font-size: var(--font-size-12);
      color: color-mix(in srgb, currentColor 70%, transparent);
      text-align: right;
    }
  `,
]

export const participantChatBubbleStyles = [
  chatBubbleSurfaceStyles,
  css`
    :host {
      background: var(--background-subtle-color);
    }
  `,
]
