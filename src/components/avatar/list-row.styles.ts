import { css } from 'lit'

export const listRowStyles = css`
  :host {
    display: block;
  }

  .list-row {
    display: flex;
    align-items: center;
    gap: var(--space-2);
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
`
