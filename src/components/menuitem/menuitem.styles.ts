import { css } from 'lit'

export const menuItemStyles = css`
  .item {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: var(--size-medium);
    gap: var(--space-1);
    border-radius: var(--radius);
    color: inherit;
    text-decoration: none;
    box-sizing: border-box;
  }

  .content {
    min-width: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .item[aria-current='page'],
  .item:hover {
    --hover-outline: 0;
    background-color: var(--color-background-subtle);
    cursor: pointer;
  }

  .item[aria-disabled='true'] {
    opacity: 0.5;
    pointer-events: none;
  }

  button {
    all: unset;
  }

  ::slotted([slot='action']) {
    margin: 0 0 0 auto !important;
  }

  mm-checkbox,
  mm-radio {
    margin-left: auto;
  }

  .item[data-tone='danger'] mm-avatar,
  .item[data-tone='danger'] mm-text {
    color: #d93025;
  }

  .item[aria-current='page'] {
    --hover-outline: 0;
    cursor: pointer;
  }
`
