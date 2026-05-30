import { css } from 'lit'

export const noticeStyles = css`
  .notice {
    --notice-text-color: var(--color-foreground);
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-3);
    border: var(--border);
    border-radius: var(--radius);
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
