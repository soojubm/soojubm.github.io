import { css } from 'lit'

export const iconButtonStyles = css`
  :host {
    --button-size: var(--size-medium);
    --button-color: var(--color-background-subtle);
    --button-radius: var(--radius);
    --button-border: 1px solid var(--color-border);
    --button-text-color: var(--color-foreground);
    --button-color-focus: #007185;
    --button-color-active-bg: #f0b800;
    --button-color-active-border: #008296;
    --button-color-active-ring: #c8f3fa;
  }

  button {
    padding: 0;
    border: 0;
    font-family: var(--font-family);
    font-size: inherit;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--button-size);
    height: var(--button-size);
    border: var(--button-border);
    border-radius: var(--button-radius);
    background: var(--button-color);
    color: var(--button-text-color);

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
      outline: 3px solid var(--button-color-focus);
      outline-offset: 2px;
    }
    &:active {
      background: var(--button-color-active-bg);
      border-color: var(--button-color-active-border);
      box-shadow: 0 0 0 3px var(--button-color-active-ring), inset 0 0 0 2px #fff;
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
      background: var(--button-color);
      border-color: var(--button-color);
      box-shadow: none;
    }
  }

  :host([variant='primary']) button {
    background-color: var(--color-primary);
    --button-text-color: #fff;
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
    --button-size: var(--size-small);
    box-shadow: var(--shadow);
  }

  :host([size='small']) button {
    --button-size: var(--size-small);
  }
`
