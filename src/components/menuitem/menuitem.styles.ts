import { css } from 'lit'

export const menuItemStyles = css`
  :host {
    --menuitem-background-color-hover: var(--interaction-hover-background-color);
    --menuitem-padding-inline: var(--space-0);
  }

  :is(button, a, [role^='menuitem']) {
    display: flex;
    align-items: center;
    width: 100%;
    padding-inline: var(--menuitem-padding-inline);
    color: inherit;
    text-decoration: none;
    box-sizing: border-box;
    text-transform: capitalize;
    cursor: pointer;

    &:hover {
      background-color: var(--menuitem-background-color-hover);
    }

    &:focus-visible {
      outline: var(--interaction-focus-outline);
      outline-offset: -1px;
    }

    &[aria-current='page'] {
      background-color: var(--interaction-selected-background-color);
    }

    &[disabled],
    &[aria-disabled='true'] {
      opacity: 0.5;
      pointer-events: none;
    }
  }

  /* tone=danger: color를 행에 지정하면 list-item 내부 텍스트·아이콘이 상속받는다 */
  :host([tone='danger']) :is(button, a, [role^='menuitem']) {
    color: var(--color-danger);
  }

  mm-list-item {
    flex: 1;
  }

  button {
    all: unset;
  }
`
