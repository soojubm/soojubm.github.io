import { css } from 'lit'

export const iconButtonStyles = css`
  :host {
    display: inline-flex;
    --icon-button-size: var(--size-medium);
    --icon-button-background-color: var(--color-background-subtle);
    --icon-button-radius: var(--radius);
    --icon-button-border: var(--border-transparent);
    --icon-button-text-color: var(--color-foreground);
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
    background: var(--icon-button-background-color);
    color: var(--icon-button-text-color);
    font-family: var(--font-family);
    font-size: inherit;
    cursor: pointer;
  }

  :host([variant='primary']) button {
    background-color: var(--color-primary);
    --icon-button-text-color: var(--color-foreground-on-solid);
  }

  :host([variant='secondary']) button {
    border: var(--border);
    border-radius: var(--radius-round);
    box-shadow: var(--shadow);
    background-color: var(--color-background);
  }

  :host([variant='ghost']) button {
    background-color: transparent;
    border: none;
  }

  :host([variant='destructive']) button {
    background-color: var(--color-danger);
    --icon-button-text-color: var(--color-foreground-on-solid);
  }

  :host([size='small']) {
    --icon-button-size: var(--size-small);
  }
`
