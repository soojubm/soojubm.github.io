import { css } from 'lit'

export const menuItemStyles = css`
  :host {
    --menuitem-radius: var(--radius);
    --menuitem-color-hover: var(--color-background-subtle);
    --menuitem-color-danger: var(--color-danger);
  }

  .item {
    display: flex;
    align-items: center;
    width: 100%;
    border-radius: var(--menuitem-radius);
    color: inherit;
    text-decoration: none;
    box-sizing: border-box;

    /* 상호작용 가능한 행(checkbox·radio·switch·link 등)만 hover 강조 */
    &[data-interactive] {
      cursor: pointer;

      &[aria-current='page'],
      &:hover {
        background-color: var(--menuitem-color-hover);
      }
    }

    &[aria-disabled='true'] {
      opacity: 0.5;
      pointer-events: none;
    }

    /* tone=danger: color를 행에 지정하면 list-row 내부 텍스트·아이콘이 상속받는다 */
    &[data-tone='danger'] {
      color: var(--menuitem-color-danger);
    }
  }

  :host([aria-current='page']) .item[data-interactive] {
    background-color: var(--menuitem-color-hover);
  }

  mm-list-row {
    flex: 1;
  }

  button {
    all: unset;
  }
`
