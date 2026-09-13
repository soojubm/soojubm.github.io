import { css } from 'lit'

export const topBarStyles = css`
  :host {
    display: block;
  }

  header {
    display: flex;
    align-items: center;
    width: 100%;
    gap: var(--space-2);
    position: relative;
  }

  .trailing-area {
    display: flex;
    gap: var(--space-2);
    margin: 0 0 0 auto;
  }
`
