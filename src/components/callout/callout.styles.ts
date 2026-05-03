import { css } from 'lit'

export const calloutStyles = css`
  .callout {
    --callout-text-color: var(--color-foreground);
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-3);
    border: var(--border);
    border-radius: var(--radius);
    color: var(--callout-text-color);
    position: relative;
  }

  .callout-close {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
  }

  .callout[data-variant='success'] {
    --callout-text-color: var(--green800);
    border: 1px solid;
  }

  .callout[data-variant='danger'] {
    --callout-text-color: var(--red800);
    border: 1px solid;
  }

  .callout[data-variant='warning'] {
    --callout-text-color: sienna;
    border: 1px solid;
  }

  figure {
    margin: 0;
    padding: 0;
  }

  h3,
  p {
    margin: 0;
  }
`
