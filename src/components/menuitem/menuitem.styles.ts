import { css } from 'lit'

export const menuItemStyles = css`
  :host {
    --menuitem-radius: var(--radius);
    --menuitem-color-hover: var(--color-background-subtle);
    --menuitem-color-danger: var(--color-danger);
    --menuitem-padding-inline-start: 0;
  }

  :is(button, a, [role^='menuitem']) {
    display: flex;
    align-items: center;
    width: 100%;
    border-radius: var(--menuitem-radius);
    padding-inline-start: var(--menuitem-padding-inline-start);
    color: inherit;
    text-decoration: none;
    box-sizing: border-box;

    /* 상호작용 가능한 행(checkbox·radio·switch·link 등)만 hover 강조 */
    &[data-interactive] {
      cursor: pointer;

      &:hover {
        background-color: var(--menuitem-color-hover);
      }

      &[aria-current='page'] {
        background-color: var(--selection-background);
      }
    }

    &[disabled],
    &[aria-disabled='true'] {
      opacity: 0.5;
      pointer-events: none;
    }
  }

  /* tone=danger: color를 행에 지정하면 list-row 내부 텍스트·아이콘이 상속받는다 */
  :host([tone='danger']) :is(button, a, [role^='menuitem']) {
    color: var(--menuitem-color-danger);
  }

  :host([aria-current='page']) [data-interactive] {
    background-color: var(--selection-background);
  }

  mm-list-row {
    flex: 1;
  }

  button {
    all: unset;
  }
`
