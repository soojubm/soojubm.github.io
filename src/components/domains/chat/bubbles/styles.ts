import { css } from 'lit'

export const myChatBubbleStyles = css`
  :host {
    --bubble-radius: var(--radius-large) var(--radius) var(--radius-large) var(--radius-large);
    --thumbnail-radius: var(--bubble-radius);

    border-radius: var(--bubble-radius);
    border: var(--my-chat-bubble-border, var(--bubble-border, none));
    background: var(--my-chat-bubble-background, var(--color-primary));
    color: var(--my-chat-bubble-color, var(--color-foreground-on-solid));
  }

  .status {
    display: block;
    margin-top: var(--space-1);
    font-size: var(--font-size-12);
    color: color-mix(in srgb, var(--color-foreground-on-solid) 70%, transparent);
    text-align: right;
  }
`
