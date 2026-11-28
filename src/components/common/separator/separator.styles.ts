import { css } from 'lit'

export const separatorStyles = css`
  :host {
    --separator-margin: var(--space-3);
    --separator-border: var(--border);
    --separator-foreground-background-color: var(--background-color);

    position: relative;
  }

  :host([level='section']) {
    --separator-margin: var(--space-8);
  }

  hr {
    width: 100%;
    margin: var(--separator-margin) 0;
    border-top: var(--separator-border);
    position: relative;
    z-index: var(--material-zindex-base);
  }

  /* 가운데 레이블 박스: 텍스트가 없으면 ::after가 선을 가리고, 있으면 slot 요소가 표시 */
  fff-caption {
    display: block;
    padding: 0 var(--separator-margin);
    background: var(--separator-foreground-background-color);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: var(--material-zindex-elevated);
  }
`
