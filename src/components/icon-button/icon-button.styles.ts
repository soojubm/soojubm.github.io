import { css } from 'lit'

export const iconButtonStyles = css`
  :host {
    --icon-button-size: var(--size-medium);
    --icon-button-color: var(--color-background-subtle);
    --icon-button-radius: var(--radius);
    --icon-button-border: 1px solid var(--color-border);
    --icon-button-text-color: var(--color-foreground);
    --icon-button-color-focus: #007185;
    --icon-button-color-active-bg: #f0b800;
    --icon-button-color-active-border: #008296;
    --icon-button-color-active-ring: #c8f3fa;
  }

  button {
    padding: 0;
    border: 0;
    font-family: var(--font-family);
    font-size: inherit;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--icon-button-size);
    height: var(--icon-button-size);
    border: var(--icon-button-border);
    border-radius: var(--icon-button-radius);
    background: var(--icon-button-color);
    color: var(--icon-button-text-color);

    cursor: pointer;
    /* 왜 커서 넣어야 되지? */

    /* 버튼과 아이콘 버튼의 상태 동일 */
    /* TODO pending */
    &:hover {
      /* box-shadow: var(--status-hover); */
      /* TODO */
      /* 통일 */
      border-color: var(--color-background-strong);
    }
    &:focus {
      outline: 3px solid var(--icon-button-color-focus);
      outline-offset: 2px;
    }
    &:active {
      background: var(--icon-button-color-active-bg);
      border-color: var(--icon-button-color-active-border);
      box-shadow: 0 0 0 3px var(--icon-button-color-active-ring), inset 0 0 0 2px #fff;
    }
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    &:disabled:hover {
      box-shadow: none;
    }
    &:disabled:focus {
      outline: none;
    }
    &:disabled:active {
      background: var(--icon-button-color);
      border-color: var(--icon-button-color);
      box-shadow: none;
    }
  }

  :host([variant='primary']) button {
    background-color: var(--color-primary);
    --icon-button-text-color: #fff;
  }

  :host([variant='plain']) button {
    background-color: transparent;
    border: none;
  }

  :host([variant='navigator']) button {
    border: var(--border);
    border-radius: 50%;
    box-shadow: var(--shadow);
    background-color: var(--color-background);
  }

  :host([variant='clear']) button {
    --icon-button-size: var(--size-small);
    box-shadow: var(--shadow);
  }

  :host([size='small']) button {
    --icon-button-size: var(--size-small);
  }
`
