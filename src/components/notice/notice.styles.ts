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
    --notice-text-color: var(--color-foreground);
    --notice-bg: transparent;
    --notice-border-color: var(--color-border);
  }

  .notice {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--notice-gap);
    padding: var(--notice-padding);
    border: var(--notice-border-width) solid var(--notice-border-color);
    border-radius: var(--notice-radius);
    background: var(--notice-bg);
    color: var(--notice-text-color);
    position: relative;
  }

  :host([variant='success']) {
    --notice-accent: var(--color-success);
    --notice-text-color: var(--color-success-foreground);
    --notice-bg: var(--color-success-subtle);
    --notice-border-color: var(--color-success-border);
  }

  :host([variant='warning']) {
    --notice-accent: var(--color-warning);
    --notice-text-color: var(--color-warning-foreground);
    --notice-bg: var(--color-warning-subtle);
    --notice-border-color: var(--color-warning-border);
  }

  :host([variant='danger']) {
    --notice-accent: var(--color-danger);
    --notice-text-color: var(--color-danger-foreground);
    --notice-bg: var(--color-danger-subtle);
    --notice-border-color: var(--color-danger-border);
  }

  .notice-icon {
    flex-shrink: 0;
    color: var(--notice-accent);
  }

  .notice-dismiss {
    position: absolute;
    right: var(--notice-padding);
    top: var(--notice-padding);
  }
`
