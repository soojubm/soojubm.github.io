import { css } from 'lit'

export const noticeStyles = css`
  :host {
    --notice-gap: var(--space-2);
    --notice-padding: var(--space-3);
    --notice-radius: var(--radius);
    --notice-border: var(--border);
    --notice-text-color: var(--color-foreground);
  }

  .notice {
    display: flex;
    align-items: center;
    gap: var(--notice-gap);
    padding: var(--notice-padding);
    border: var(--notice-border);
    border-radius: var(--notice-radius);
    color: var(--notice-text-color);
    position: relative;
  }

  .notice-close {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
  }

  .notice[data-variant='success'] {
    --notice-text-color: var(--green800);
    border: 1px solid;
  }

  .notice[data-variant='danger'] {
    --notice-text-color: var(--red800);
    border: 1px solid;
  }

  .notice[data-variant='warning'] {
    --notice-text-color: sienna;
    border: 1px solid;
  }

  figure {
    margin: 0;
    padding: 0;
  }

  h3,
  mm-text {
    margin: 0;
  }
`
