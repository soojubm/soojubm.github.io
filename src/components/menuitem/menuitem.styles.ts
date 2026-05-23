import { css } from 'lit'

export const menuItemStyles = css`
  .item {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: var(--size-medium);
    gap: var(--space-1);
    border-radius: var(--radius);
  }
  .item[aria-current='page'],
  .item:hover {
    --hover-outline: 0;
    background-color: var(--color-background-subtle);
    cursor: pointer;
  }

  button {
    all: unset;
  }

  ::slotted([slot='action']) {
    margin: 0 0 0 auto !important;
  }

  .item[data-tone='danger'] mm-avatar,
  .item[data-tone='danger'] mm-text[variant='body'] {
    color: #d93025;
  }

  .item[aria-current='page'] {
    --hover-outline: 0;
    cursor: pointer;
  }
`
