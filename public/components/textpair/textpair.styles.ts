import { css } from 'lit'

export const textpairStyles = css`
  :host {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: var(--space-2);
  }
  .summary-item {
    display: flex;
    justify-content: space-between;
  }
  .summary-item[data-alignment='inline'] {
    justify-content: baseline;
    gap: var(--space-2);
  }
  /* .summary-item[data-size='large'] {font-size: var(--font-size-18);} */

  :host {
    display: flex;
    gap: 2rem;
  }
`
