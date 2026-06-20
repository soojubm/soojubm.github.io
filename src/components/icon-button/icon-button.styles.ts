import { css } from 'lit'

export const iconButtonStyles = css`
  :host {
    display: inline-flex;
    --icon-button-size: var(--size-medium);
    --icon-button-color: var(--color-background-subtle);
    --icon-button-radius: var(--radius);
    --icon-button-border: var(--border-transparent);
    --icon-button-text-color: var(--color-foreground);
    --icon-button-color-focus: var(--color-interaction-focus);
    --icon-button-color-active-bg: var(--color-interaction-active-background);
    --icon-button-color-active-border: var(--color-interaction-active-border);
    --icon-button-color-active-ring: var(--color-interaction-active-ring);
  }

  button {
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--icon-button-size);
    height: var(--icon-button-size);
    border: var(--icon-button-border);
    border-radius: var(--icon-button-radius);
    background: var(--icon-button-color);
    color: var(--icon-button-text-color);
    font-family: var(--font-family);
    font-size: inherit;
    cursor: pointer;

    &:hover {
      border-color: var(--color-background-strong);
    }
    &:focus {
      outline: 3px solid var(--icon-button-color-focus);
      outline-offset: 2px;
    }
    &:active {
      background: var(--icon-button-color-active-bg);
      border-color: var(--icon-button-color-active-border);
      box-shadow: 0 0 0 3px var(--icon-button-color-active-ring),
        inset 0 0 0 2px var(--color-foreground-on-solid);
    }
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;

      &:hover {
        box-shadow: none;
      }
      &:focus {
        outline: none;
      }
      &:active {
        background: var(--icon-button-color);
        border-color: var(--icon-button-color);
        box-shadow: none;
      }
    }
  }

  :host([variant='primary']) button {
    background-color: var(--color-primary);
    --icon-button-text-color: var(--color-foreground-on-solid);
  }

  :host([variant='plain']) button {
    background-color: transparent;
    border: none;
  }

  :host([variant='navigator']) button {
    border: var(--border);
    border-radius: var(--radius-round);
    box-shadow: var(--shadow);
    background-color: var(--color-background);
  }

  :host([variant='clear']) {
    --icon-button-size: var(--size-tiny);
    --icon-button-radius: var(--radius-round);
    --icon-button-color: var(--color-background);
  }

  :host([size='small']) {
    --icon-button-size: var(--size-small);
  }
`
