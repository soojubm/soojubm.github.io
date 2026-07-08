import { css } from 'lit'

export const separatorStyles = css`
  :host {
    --separator-spacing: var(--space-4);
    --separator-border: var(--border);
    --separator-text-color: var(--color-foreground-light);
    --separator-text-background: var(--color-background);

    position: relative;
  }

  :host([spacing='small']) {
    --separator-spacing: var(--space-2);
  }

  :host([spacing='medium']) {
    --separator-spacing: var(--space-4);
  }

  hr[role='separator'] {
    width: 100%;
    margin: var(--separator-spacing) 0;
    border: 0;
    border-top: var(--separator-border);
    position: relative;
    z-index: var(--zindex-default);
  }

  /* 가운데 레이블 박스: 텍스트가 없으면 ::after가 선을 가리고, 있으면 slot 요소가 표시 */
  mm-caption {
    display: block;
    padding: 0 var(--separator-spacing);
    background: var(--separator-text-background);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }
`
