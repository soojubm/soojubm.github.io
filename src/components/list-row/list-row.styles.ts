import { css } from 'lit'

export const listRowStyles = css`
  :host {
    display: flex;
    align-items: center;
    min-height: var(--list-row-size);
    gap: var(--list-row-gap);

    --list-row-size: var(--size-medium);
    --list-row-gap: var(--space-2);
  }

  :host([size='large']) {
    height: var(--list-row-size);
    --list-row-size: var(--size-large);
  }

  :host([size='huge']) {
    --list-row-size: var(--size-huge);
    --list-row-gap: var(--space-3);
  }

  [slot='leading'],
  [slot='trailing'] {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
  }

  mm-flex {
    min-width: 0;
    flex: 1;
  }

  mm-text[color='light'] {
    margin-top: -0.125rem;
  }

  .emoji {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--list-row-size);
    height: var(--list-row-size);
    font-size: var(--font-size-18);
    line-height: 1;
  }

  :host([size='large']) .emoji,
  :host([size='huge']) .emoji {
    font-size: var(--font-size-24);
  }
`
