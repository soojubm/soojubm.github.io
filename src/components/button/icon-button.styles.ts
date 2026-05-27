import { css } from 'lit'

export const iconButtonStyles = css`
  button {
    padding: 0;
    border: 0;
    font-family: var(--font-family);
    font-size: inherit;

    --button-size: var(--size-medium);
  }

  .icon-button {
    /* // reset */
    font-family: inherit;
    font-family: var(--font-family);
    font-size: inherit;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--button-size);
    height: var(--button-size);
    border-radius: var(--radius);
    background: var(--color-background-subtle);
    color: var(--button-text-color);

    cursor: pointer;
    /* 왜 커서 넣어야 되지? */

    &[data-variant='primary'] {
      background-color: var(--color-primary);
      --button-text-color: #fff;
    }

    &[data-variant='plain'] {
      background-color: transparent;
      border: none;
    }

    &[data-variant='navigator'] {
      border: var(--border);
      border-radius: 50%;
      box-shadow: var(--shadow);
      background-color: var(--color-background);
    }
    &[data-variant='clear'] {
      --button-size: var(--size-small);
      box-shadow: var(--shadow);
    }

    &[data-size='small'] {
      --button-size: var(--size-small);
    }

    /* 버튼과 아이콘 버튼의 상태 동일 */
    /* TODO pending */
    &:hover {
      /* box-shadow: var(--status-hover); */
      /* TODO */
      /* 통일 */
      border-color: var(--color-background-strong);
    }
    &:focus {
      outline: 3px solid #007185;
      outline-offset: 2px;
    }
    &:active {
      background: #f0b800;
      border-color: #008296;
      box-shadow: 0 0 0 3px #c8f3fa, inset 0 0 0 2px #fff;
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
`
