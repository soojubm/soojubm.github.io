import { css } from 'lit'

export const addSurfaceButtonStyles = css`
  :host {
    --add-surface-button-size: var(--size-medium);
    --add-surface-button-color: var(--color-foreground);
    --add-surface-button-radius: var(--radius);
    --add-surface-button-hover-bg: var(--color-background-subtle);
  }

  button {
    all: unset;
    display: flex;
    align-items: center;
    gap: var(--space-2);
    width: 100%;
    height: var(--add-surface-button-size);
    padding: 0 var(--space-3);
    border: var(--border);
    border-radius: var(--add-surface-button-radius);
    color: var(--add-surface-button-color);
    box-shadow: var(--shadow);
    font-family: var(--font-family);
    box-sizing: border-box;
    cursor: pointer;

    &:hover {
      background-color: var(--add-surface-button-hover-bg);
    }
  }

  mm-icon {
    flex-shrink: 0;
  }
`
