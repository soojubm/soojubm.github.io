import { css } from 'lit'

export const myChatBubbleStyles = css`
  :host {
    justify-content: flex-end;
  }

  :host([failed]) {
    flex-direction: column;
    align-items: flex-end;
    gap: var(--space-1);

    & .bubble {
      background: color-mix(in srgb, var(--color-danger) 12%, var(--color-background));
      color: var(--color-foreground);
      border: 1px solid var(--color-danger);
    }
  }

  .bubble {
    border-radius: var(--radius-large);
    border-top-left-radius: 1rem;
    border-top-right-radius: var(--radius);
    background: var(--color-primary);
    color: var(--color-foreground-on-solid);

    &.is-image {
      background: none;
    }
  }

  .typing span {
    background: var(--color-foreground-on-solid);
  }

  .status {
    display: block;
    margin-top: var(--space-1);
    font-size: var(--font-size-12);
    color: color-mix(in srgb, var(--color-foreground-on-solid) 70%, transparent);
    text-align: right;
  }

  /* 전송 실패 */
  .failed-row {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    justify-content: flex-end;
  }

  .failed-status {
    color: var(--color-danger);
    white-space: nowrap;
  }
`
