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

/**
 * 말풍선 표면을 갖는 버블(내가·참여자가 보낸 쪽)이 공유하는 여백·경계·색.
 * 표면 색은 토큰으로만 소비하므로, 발신자별 스킨과 message가 소유하는 상태(실패 등)가
 * 속성을 다시 선언하지 않고 같은 토큰을 재할당해 덮는다.
 */
const chatBubbleSurfaceStyles = css`
  :host {
    --chat-bubble-background-color: none;
    --chat-bubble-text-color: inherit;
    --chat-bubble-border: var(--border-transparent);

    padding: var(--space-3) var(--space-4);
    border: var(--chat-bubble-border);
    border-radius: var(--bubble-border-radius);
    background: var(--chat-bubble-background-color);
    color: var(--chat-bubble-text-color);
  }
`

export const myChatBubbleStyles = [
  chatBubbleSurfaceStyles,
  css`
    :host {
      --bubble-border-radius: var(--radius-large) var(--radius) var(--radius-large)
        var(--radius-large);
      --thumbnail-border-radius: var(--bubble-border-radius);
      --chat-bubble-background-color: var(--primary-color);
      --chat-bubble-text-color: var(--foreground-on-strong-color);
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
      --chat-bubble-background-color: var(--background-subtle-color);
    }
  `,
]
