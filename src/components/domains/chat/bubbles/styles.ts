import { css } from 'lit'

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
      --my-chat-bubble-background: var(--color-primary);
      --my-chat-bubble-color: var(--foreground-color-on-solid);
      --my-chat-bubble-border: var(--border-transparent);

      background: var(--my-chat-bubble-background);
      color: var(--my-chat-bubble-color);
      border: var(--my-chat-bubble-border);
    }

    .status {
      display: block;
      margin-top: var(--space-1);
      font-size: var(--font-size-12);
      color: color-mix(in srgb, var(--foreground-color-on-solid) 70%, transparent);
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
