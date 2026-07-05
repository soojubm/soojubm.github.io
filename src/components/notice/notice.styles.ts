import { css } from 'lit'

export const noticeStyles = css`
  :host {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-2);
    width: 100%;
    padding: var(--notice-padding);
    border: var(--notice-border-width) solid var(--notice-border-color);
    border-radius: var(--notice-border-radius);
    background: var(--notice-background-color);
    color: var(--notice-text-color);
    position: relative;

    /* structure */
    --notice-padding: var(--space-3);
    --notice-border-radius: var(--radius);
    --notice-border-width: var(--border-width);

    /* semantic color — default (info) */
    --notice-accent: var(--color-foreground-light);
    --notice-text-color: var(--color-foreground);
    --notice-background-color: transparent;
    --notice-border-color: var(--color-border);
  }

  :host([variant='success']) {
    --notice-accent: var(--color-success);
    --notice-text-color: var(--color-success-foreground);
    --notice-background-color: var(--color-success-subtle);
    --notice-border-color: var(--color-success-border);
  }

  :host([variant='warning']) {
    --notice-accent: var(--color-warning);
    --notice-text-color: var(--color-warning-foreground);
    --notice-background-color: var(--color-warning-subtle);
    --notice-border-color: var(--color-warning-border);
  }

  :host([variant='danger']) {
    --notice-accent: var(--color-danger);
    --notice-text-color: var(--color-danger-foreground);
    --notice-background-color: var(--color-danger-subtle);
    --notice-border-color: var(--color-danger-border);
  }

  .notice-icon {
    flex-shrink: 0;
    color: var(--notice-accent);
  }

  .notice-heading {
    margin-bottom: calc(var(--space-2) * -1);
  }

  .notice-dismiss {
    position: absolute;
    right: var(--notice-padding);
    top: var(--notice-padding);
  }
`
