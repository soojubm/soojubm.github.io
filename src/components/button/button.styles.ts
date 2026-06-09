import { css } from 'lit'

export const buttonStyles = css`
  :host {
    --button-size: var(--size-medium);
    --button-min-width: 5rem;
    --button-padding-inline: var(--space-3);
    --button-border: var(--border);
    --button-color: var(--color-background-subtle);
    --button-radius: var(--radius);
    --button-text-color: var(--color-foreground);
    --button-text-size: inherit;
    --button-text-weight: var(--font-weight-bold);
    --button-color-focus: var(--color-interaction-focus);
    --button-color-active-bg: var(--color-interaction-active-background);
    --button-color-active-border: var(--color-interaction-active-border);
    --button-color-active-ring: var(--color-interaction-active-ring);
  }

  :host([isfullwidth]) button {
    width: 100%;
  }

  :host([variant='primary']) button {
    --button-border-color: var(--border-transparent);
    background-color: var(--color-primary);
    --button-text-color: var(--color-foreground-on-solid);
  }
  :host([variant='secondary']) button {
    --button-border-color: var(--border-transparent);
    --button-color: var(--green100);
    --button-text-color: var(--color-primary);
  }
  :host([variant='tertiary']) button {
    --button-text-color: var(--color-foreground);
  }
  :host([variant='text']) button {
    --button-border-color: var(--border-transparent);
    --button-color: var(--color-background);
    --button-text-color: var(--color-primary);
  }
  :host([variant='destructive']) button {
    --button-color: var(--red800);
    --button-text-color: var(--gray0);
  }

  :host([size='huge']) button {
    --button-size: 64px;
    --button-text-size: var(--font-size-18);
    padding-bottom: 5px;
  }
  :host([size='large']) button {
    --button-size: var(--size-large);
    min-width: var(--button-min-width);
  }
  :host([size='small']) button {
    --button-size: 2rem;
    --button-text-size: var(--font-size-12);
    --button-padding-inline: var(--space-2);
    min-width: 0;
  }

  /* TODO filter-button으로 이동 */
  :host([aria-checked='true']) button {
    border: var(--border-width) solid
      var(--button-checked-border-color, var(--color-background-strong));
    background: var(--button-checked-color, var(--button-color));
    color: var(--button-checked-text-color, var(--button-text-color));
  }

  :host([aria-checked='true']) button mm-icon {
    --button-text-color: var(--button-checked-icon-color, currentColor);
  }

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    /* max-content for trailing icons */
    width: max-content;
    gap: var(--space-2);
    height: var(--button-size);
    padding: 0 var(--button-padding-inline);
    border: var(--button-border);
    border-radius: var(--button-radius);
    background: var(--button-color);
    box-sizing: border-box;

    font-family: var(--font-family);
    font-size: var(--button-text-size);
    font-weight: var(--button-text-weight);
    color: var(--button-text-color);
    text-transform: capitalize;

    cursor: pointer;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    &:hover {
      border-color: var(--color-background-strong);
    }
    &:focus {
      outline: 3px solid var(--button-color-focus);
      outline-offset: 2px;
    }
    &:enabled:active {
      background: var(--button-color-active-bg);
      border-color: var(--button-color-active-border);
      box-shadow: 0 0 0 3px var(--button-color-active-ring),
        inset 0 0 0 2px var(--color-foreground-on-solid);
    }
  }
`
