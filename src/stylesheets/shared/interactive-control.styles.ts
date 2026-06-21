import { css } from 'lit'

export const interactiveControlStyles = css`
  :host {
    --control-color-focus: var(--color-interaction-focus);
    --control-color-active-bg: var(--color-interaction-active-background);
    --control-color-active-border: var(--color-interaction-active-border);
    --control-color-active-ring: var(--color-interaction-active-ring);
  }

  button {
    &:hover {
      border-color: var(--color-background-strong);
    }

    &:focus {
      outline: var(--space-1) solid var(--control-color-focus);
      outline-offset: var(--space-05);
    }

    &:enabled:active {
      background: var(--control-color-active-bg);
      border-color: var(--control-color-active-border);
      box-shadow: 0 0 0 var(--space-1) var(--control-color-active-ring),
        inset 0 0 0 var(--space-05) var(--color-foreground-on-solid);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`
