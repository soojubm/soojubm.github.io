import { css } from 'lit'

export const rowStyles = css`
  .row {
    display: flex;
    align-items: center;
    width: 100%;
    gap: var(--space-1);

    &[data-justify-content='space-between'] {
      justify-content: space-between;
    }
  }
`
