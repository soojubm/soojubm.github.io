import { css } from 'lit'

export const metaItemStyles = css`
  :host {
    display: flex;
  }

  :host([layout='stacked']) .meta-item {
    flex-direction: column;
    gap: var(--space-0);
  }
  :host([layout='inline']) .meta-item {
    justify-content: flex-start;
    gap: var(--space-2);
  }

  .meta-item {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
`
