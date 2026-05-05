import { css } from 'lit'

export const featureStyles = css`
  div {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: var(--space-3);
    position: relative;
    z-index: 1;
  }

  div([variant='primary']) {
  }
`
