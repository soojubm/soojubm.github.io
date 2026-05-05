import { css } from 'lit'

export const tablistStyles = css`
  [role='tablist'] {
    --tablist-border: null;
    --tablist-background: var(--color-background-subtle);
    --tab-radius: var(--radius);
    --tab-border: var(--border);
    --tab-label-color: var(--color-foreground-light);
    --tab-label-weight: var(--font-weight-bold);
    --tab-label-color-actived: var(--color-foreground);
    --tab-size: var(--size-large);
    display: flex;
    width: fit-content;
    padding: var(--space-1);
    border-radius: var(--tab-radius);
    background: var(--tablist-background);
    position: relative;
  }

  [role='tablist'][data-variant='primary'] {
    --tablist-background: transparent;
    --tab-size: var(--size-large);
    border-bottom: var(--border);
  }
`
