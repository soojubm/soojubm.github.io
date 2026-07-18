import { css } from 'lit'

export const noticeStyles = css`
  :host {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    width: 100%;
    padding: var(--notice-padding);
    border: var(--notice-border-width) solid var(--notice-border-color);
    border-radius: var(--notice-border-radius);
    background: var(--notice-background-color);
    color: var(--notice-foreground-color);
    position: relative;

    --notice-padding: var(--space-3);
    --notice-border-radius: var(--radius);
    --notice-border-width: var(--border-width);
    --notice-foreground-color: var(--color-foreground);
    --notice-background-color: transparent;
    --notice-border-color: var(--color-border);
  }

  :host([variant='success']) {
    /* TODO on- */
    --notice-foreground-color: var(--color-success-foreground);
    --notice-background-color: var(--color-warning-background);
    --notice-border-color: var(--color-success);
  }

  :host([variant='warning']) {
    --notice-foreground-color: var(--color-warning-foreground);
    --notice-background-color: var(--color-warning);
    --notice-border-color: var(--color-warning);
  }

  :host([variant='danger']) {
    --notice-foreground-color: var(--color-danger-foreground);
    --notice-background-color: var(--color-danger);
    --notice-border-color: var(--color-danger);
  }

  .notice-dismiss {
    position: absolute;
    right: var(--notice-padding);
    top: var(--notice-padding);
  }
`
