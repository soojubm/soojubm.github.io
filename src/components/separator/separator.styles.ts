import { css } from 'lit'

export const separatorStyles = css`
  :host {
    --separator-spacing: var(--space-4);
    --separator-border: var(--border);
    --separator-text-color: var(--color-foreground-light);
    --separator-text-background: var(--color-background);
  }

  hr {
    margin: 0;
    border: 0;
    position: relative;
  }

  hr[role='separator'] {
    width: 100%;
    margin: var(--separator-spacing) 0;
    border-top: var(--separator-border);
    text-align: center;
    position: relative;
    z-index: var(--zindex-default);
  }

  hr[role='separator']::after {
    content: '';
    width: 4rem;
    line-height: 24px;
    background: var(--separator-text-background);
    font-size: var(--font-size-12);
    color: var(--separator-text-color);
    text-align: center;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
  }

  hr[role='separator'][data-spacing='small'] {
    margin-block: var(--space-2);
  }

  ::slotted([slot='text']) {
    width: 4rem;
    line-height: 24px;
    background: var(--separator-text-background);
    font-size: var(--font-size-12);
    color: var(--separator-text-color);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`
