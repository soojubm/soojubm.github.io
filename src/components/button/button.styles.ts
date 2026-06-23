import { css } from 'lit'

export const buttonStyles = css`
  :host {
    --button-size: var(--size-medium);
    --button-min-width: 5rem;
    --button-padding-inline: var(--space-3);
    --button-border: var(--border-transparent);
    --button-background-color: var(--color-background-subtle);
    --button-radius: var(--radius);
    --button-text-color: var(--color-foreground);
    --button-text-size: inherit;
    --button-text-weight: var(--font-weight-normal);
  }

  :host([full-width]) button {
    width: 100%;
  }

  :host([variant='primary']) {
    --button-border: var(--border-transparent);
    --button-background-color: var(--color-primary);
    --button-text-color: var(--color-foreground-on-solid);
  }
  :host([variant='secondary']) {
    --button-border: var(--border-transparent);
    --button-background-color: var(--color-primary-subtle);
    --button-text-color: var(--color-primary);
  }
  :host([variant='tertiary']) {
    --button-text-color: var(--color-foreground);
  }
  :host([variant='ghost']) {
    --button-border: var(--border-transparent);
    --button-background-color: transparent;
    --button-text-color: var(--color-primary);
  }
  :host([variant='destructive']) {
    --button-background-color: var(--color-danger);
    --button-text-color: var(--color-foreground-on-solid);
  }

  :host([size='huge']) button {
    --button-size: var(--size-huge);
    --button-text-size: var(--font-size-18);
    padding-bottom: 5px;
  }
  :host([size='large']) button {
    --button-size: var(--size-large);
    min-width: var(--button-min-width);
  }
  :host([size='small']) button {
    --button-size: var(--size-medium);
    min-width: 0;
  }

  /* TODO filter-button으로 이동 */
  button[aria-checked='true'] {
    border: var(--border-width) solid
      var(--button-checked-border-color, var(--color-background-strong));
    background: var(--button-checked-background-color, var(--button-background-color));
    color: var(--button-checked-text-color, var(--button-text-color));

    mm-icon {
      --button-text-color: var(--button-checked-icon-color, currentColor);
    }
  }

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    /* max-content for trailing icons */
    width: var(--button-width, max-content);
    gap: var(--space-2);
    height: var(--button-size);
    padding: 0 var(--button-padding-inline);
    border: var(--button-border);
    border-radius: var(--button-radius);
    background: var(--button-background-color);
    box-sizing: border-box;

    font-family: var(--font-family);
    font-size: var(--button-text-size);
    font-weight: var(--button-text-weight);
    color: var(--button-text-color);
    text-transform: capitalize;

    cursor: pointer;
  }
`
