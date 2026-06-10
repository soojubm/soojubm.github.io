import { css } from 'lit'

export const noticeStyles = css`
  :host {
    display: block;
    width: 100%;

    /* structure */
    --notice-gap: var(--space-2);
    --notice-padding: var(--space-3);
    --notice-radius: var(--radius);
    --notice-border-width: var(--border-width);

    /* semantic color — default (info) */
    --notice-accent: var(--color-foreground-light);
    --notice-color: var(--color-foreground);
    --notice-bg: transparent;
    --notice-border-color: var(--color-border);
  }

  .notice {
    display: flex;
    align-items: center;
    gap: var(--notice-gap);
    padding: var(--notice-padding);
    border: var(--notice-border-width) solid var(--notice-border-color);
    border-radius: var(--notice-radius);
    background: var(--notice-bg);
    color: var(--notice-color);

    &[data-variant='success'] {
      --notice-accent: var(--color-success);
      --notice-color: var(--color-success);
      --notice-bg: var(--color-success-subtle);
      --notice-border-color: var(--color-success-border);
    }
    &[data-variant='warning'] {
      --notice-accent: var(--color-warning);
      --notice-color: var(--color-warning);
      --notice-bg: var(--color-warning-subtle);
      --notice-border-color: var(--color-warning-border);
    }
    &[data-variant='danger'] {
      --notice-accent: var(--color-danger);
      --notice-color: var(--color-danger);
      --notice-bg: var(--color-danger-subtle);
      --notice-border-color: var(--color-danger-border);
    }
  }

  .notice-icon {
    color: var(--notice-accent);
    flex-shrink: 0;
  }

  h3,
  mm-text {
    margin: 0;
  }

  .notice-dismiss {
    margin-left: auto;
    flex-shrink: 0;
  }
`
