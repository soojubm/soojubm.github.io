import { css } from 'lit'

export const listRowStyles = css`
  :host {
    --list-row-size: var(--size-medium);
    --list-row-gap: var(--space-2);
    display: block;
  }

  :host([size='large']) {
    --list-row-size: var(--size-large);
    --list-row-gap: var(--space-3);
  }

  .list-row {
    display: flex;
    align-items: center;
    min-height: var(--list-row-size);
    gap: var(--list-row-gap);
  }

  .list-row-leading,
  .list-row-trailing {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
  }

  .list-row-content {
    min-width: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .list-row-emoji {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--list-row-size);
    height: var(--list-row-size);
    font-size: var(--font-size-18);
    line-height: 1;
  }

  :host([size='large']) .list-row-emoji {
    font-size: var(--font-size-24);
  }
`
