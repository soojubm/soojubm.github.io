import { css } from 'lit'

export const separatorStyles = css`
  :host {
    --separator-spacing: var(--space-4);
    --separator-border: var(--border);
    --separator-text-color: var(--color-foreground-light);
    --separator-text-background: var(--color-background);
    /* 가운데 텍스트 레이블 공통 토큰 */
    --separator-label-width: 4rem;
    --separator-label-line-height: 24px;
  }

  hr {
    margin: 0;
    border: 0;
    position: relative;

    &[role='separator'] {
      width: 100%;
      margin: var(--separator-spacing) 0;
      border-top: var(--separator-border);
      text-align: center;
      position: relative;
      z-index: var(--zindex-default);

      /* 텍스트 없을 때: ::after로 배경 박스만 그려 선을 가림 */
      &::after {
        content: '';
        width: var(--separator-label-width);
        line-height: var(--separator-label-line-height);
        background: var(--separator-text-background);
        font-size: var(--font-size-12);
        color: var(--separator-text-color);
        text-align: center;
        position: absolute;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
      }

      &[data-spacing='small'] {
        margin-block: var(--space-2);
      }
    }
  }

  /* 텍스트 있을 때: slot 요소가 ::after 위에 올라와 선을 가리고 텍스트를 표시 */
  ::slotted([slot='text']) {
    width: var(--separator-label-width);
    line-height: var(--separator-label-line-height);
    background: var(--separator-text-background);
    font-size: var(--font-size-12);
    color: var(--separator-text-color);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`
