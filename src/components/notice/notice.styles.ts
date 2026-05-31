import { css } from 'lit'

export const noticeStyles = css`
  :host {
    --notice-gap: var(--space-2);
    --notice-padding: var(--space-3);
    --notice-radius: var(--radius);
    --notice-border: var(--border);
    --notice-text-color: var(--color-foreground);
    --notice-icon-color: var(--color-foreground-light);
  }

  .notice {
    display: flex;
    align-items: center;
    gap: var(--notice-gap);
    padding: var(--notice-padding);
    border: var(--notice-border);
    border-radius: var(--notice-radius);
    color: var(--notice-text-color);
  }

  .notice-icon {
    color: var(--notice-icon-color);
    flex-shrink: 0;
  }

  h3,
  mm-text {
    margin: 0;
  }

  .notice[data-variant='success'] {
    --notice-text-color: var(--green800);
    --notice-icon-color: var(--green800);
    background: color-mix(in srgb, var(--green800) 8%, var(--color-background));
    border-color: color-mix(in srgb, var(--green800) 30%, transparent);
  }

  .notice[data-variant='warning'] {
    --notice-text-color: var(--yellow800);
    --notice-icon-color: var(--yellow800);
    background: color-mix(in srgb, var(--yellow800) 8%, var(--color-background));
    border-color: color-mix(in srgb, var(--yellow800) 30%, transparent);
  }

  .notice[data-variant='danger'] {
    --notice-text-color: var(--color-danger);
    --notice-icon-color: var(--color-danger);
    background: color-mix(in srgb, var(--color-danger) 8%, var(--color-background));
    border-color: color-mix(in srgb, var(--color-danger) 30%, transparent);
  }
`
