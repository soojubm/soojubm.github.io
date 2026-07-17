import { css } from 'lit'

export const listItemStyles = css`
  :host {
    display: flex;
    align-items: center;
    min-height: var(--list-item-size);
    gap: var(--list-item-gap);

    --list-item-size: var(--size-medium);
    --list-item-gap: var(--space-2);
  }

  /* :host([size='32']) {
  } */

  :host([size='40']) {
  }

  :host([size='48']) {
    --list-item-gap: var(--space-2);
    --list-item-size: var(--size-large);
  }

  :host([size='80']) {
    --list-item-size: var(--size-huge);
    --list-item-gap: var(--space-3);
  }

  [slot='leading'],
  [slot='trailing'] {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
  }

  .content {
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
    width: var(--list-item-size);
    height: var(--list-item-size);
    font-size: var(--font-size-18);
    line-height: 1;
  }

  :host([size='48']) .emoji,
  :host([size='80']) .emoji {
    font-size: var(--font-size-24);
  }
`
