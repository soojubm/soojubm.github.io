import { css } from 'lit'

export const metaItemStyles = css`
  :host {
    display: flex;
    justify-content: space-between;
  }

  :host([layout='stacked']) {
    flex-direction: column;
    gap: 0;
  }

  :host([layout='stacked'][align='center']) {
    align-items: center;
  }

  :host([layout='inline']) {
    justify-content: flex-start;
    gap: var(--space-2);
  }
`
