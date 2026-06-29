import { css } from 'lit'

export const chatBubbleStyles = css`
  :host {
    display: block;
    position: relative;
    width: fit-content;
    max-width: min(85%, 600px);
    padding: var(--space-3) var(--space-4);
    border: var(--bubble-border, none);
    border-radius: var(--bubble-radius);
    background-color: var(--color-background-subtle);
    box-sizing: border-box;
    font-size: var(--font-size-14);
    line-height: var(--line-height-14);

    --bubble-radius: var(--radius) var(--radius-large) var(--radius-large) var(--radius-large);
    --thumbnail-radius: var(--bubble-radius);
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
