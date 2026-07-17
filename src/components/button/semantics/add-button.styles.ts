import { css } from 'lit'

export const addButtonStyles = css`
  :host {
    --add-button-height: var(--size-large);
    --add-button-text-color: var(--color-foreground);
    --add-button-border-radius: var(--radius);
    --add-button-hover-bg: var(--color-background-subtle);
  }

  button {
    all: unset;
    display: flex;
    align-items: center;
    gap: var(--space-2);
    width: 100%;
    height: var(--add-button-height);
    padding: 0 var(--space-3);
    border: var(--border);
    border-radius: var(--add-button-border-radius);
    color: var(--add-button-text-color);
    box-shadow: var(--material-shadow);
    font-family: var(--font-family);
    box-sizing: border-box;
    cursor: pointer;

    &:hover {
      background-color: var(--add-button-hover-bg);
    }
  }

  mm-icon {
    flex-shrink: 0;
  }
`
