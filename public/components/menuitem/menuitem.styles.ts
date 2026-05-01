import { css } from 'lit'

export const menuItemStyles = css`
  .menu-group {
    display: flex;
    flex-direction: column;
  }

  .item {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: var(--size-medium);
    gap: var(--space-1);
    position: relative;
    z-index: 1;
  }

  button {
    all: unset;
  }

  a {
    text-decoration: none;
    color: var(--color-foreground);
  }

  ::slotted([slot='action']) {
    margin: 0 0 0 auto !important;
  }

  .item:hover {
    --hover-outline: 0;
    cursor: pointer;
  }

  .item:hover::before {
    content: '';
    display: block;
    background-color: var(--color-background-subtle);
    border-radius: var(--radius);
    position: absolute;
    left: var(--hover-outline);
    right: var(--hover-outline);
    top: var(--hover-outline);
    bottom: var(--hover-outline);
    z-index: -1;
  }

  .item[data-tone='danger'] mm-avatar,
  .item[data-tone='danger'] mm-text[variant='body'] {
    color: #d93025;
  }

  .item[aria-current='page'] {
    --hover-outline: 0;
    cursor: pointer;
  }

  .item[aria-current='page']::before {
    content: '';
    display: block;
    background-color: var(--green100);
    border-radius: var(--radius);
    position: absolute;
    left: var(--hover-outline);
    right: var(--hover-outline);
    top: var(--hover-outline);
    bottom: var(--hover-outline);
    z-index: -1;
  }
`
