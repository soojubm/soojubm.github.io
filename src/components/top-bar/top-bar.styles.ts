import { css } from 'lit'

export const topBarStyles = css`
  :host {
    display: block;
  }

  .top-bar {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    position: relative;
  }

  ::slotted([slot='action']) {
    margin: 0 0 0 auto;
  }
`
