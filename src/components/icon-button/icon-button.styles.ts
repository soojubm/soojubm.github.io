import { css } from 'lit'
import { buttonHostTokens } from './button.tokens'

export const iconButtonStyles = css`
  /* 토큰은 button.tokens.ts에서 button과 공유한다. */
  :host {
    ${buttonHostTokens}
  }

  button {
    padding: 0;
    border: 0;
    font-family: var(--font-family);
    font-size: inherit;
  }

  .icon-button {
    font-family: var(--font-family);
    font-size: inherit;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--button-size);
    height: var(--button-size);
    border-radius: var(--button-radius);
    background: var(--button-color);
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

  /* brutal: variant가 element-level border를 설정하므로 :host-context로 덮어
     모든 아이콘 버튼에 #000 보더 적용 (base에 border가 없어 full border 지정) */
  :host-context([data-theme='brutal']) .icon-button {
    border: var(--border-stronger);
  }
`
