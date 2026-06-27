import { css } from 'lit'

export const metaItemStyles = css`
  :host {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  :host([layout='stacked']) {
    flex-direction: column;
    gap: var(--space-0);
  }

  :host([layout='inline']) {
    justify-content: flex-start;
    gap: var(--space-2);
  }
`
