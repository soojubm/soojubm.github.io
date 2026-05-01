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

  button {
    border: 1px solid transparent;
    background: none;
    font-family: inherit;
  }

  .tab {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: var(--size-medium);
    gap: var(--space-1);
    padding: 0 var(--space-3);
    color: var(--color-foreground-light);
    font-weight: var(--font-weight-bold);
    position: relative;
    z-index: var(--zindex-default);
    cursor: pointer;
  }

  .tab:hover {
    color: var(--color-foreground);
  }

  .tab[aria-selected='true'] {
    border-radius: var(--radius);
    background: var(--color-background);
    box-shadow: var(--shadow);
    box-sizing: border-box;
    color: var(--color-foreground);
  }

  .tab-label {
    padding: 0;
  }
`
