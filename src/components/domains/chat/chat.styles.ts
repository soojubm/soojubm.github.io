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

  :host([data-image]) {
    padding: 0;
    background: none;
    overflow: hidden;
  }

  :host([data-image]) mm-thumbnail {
    display: block;
    max-width: 240px;
    overflow: hidden;
  }

  /* 타이핑 애니메이션 */
  .typing {
    display: flex;
    align-items: center;
    gap: var(--space-1);

    span {
      display: block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--color-foreground-light);
      animation: bounce 1.2s infinite ease-in-out;

      &:nth-child(1) {
        animation-delay: 0s;
      }
      &:nth-child(2) {
        animation-delay: 0.2s;
      }
      &:nth-child(3) {
        animation-delay: 0.4s;
      }
    }
  }

  @keyframes bounce {
    0%,
    60%,
    100% {
      transform: translateY(0);
    }
    30% {
      transform: translateY(-6px);
    }
  }
`
