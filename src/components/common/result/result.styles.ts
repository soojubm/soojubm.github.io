import { css } from 'lit'

export const resultStyles = css`
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: var(--layout-width-narrow);
    gap: var(--space-4);
    margin: 0 auto;
  }

  slot:not([name]) {
    width: 100%;
  }
`
