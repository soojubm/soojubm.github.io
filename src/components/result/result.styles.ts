import { css } from 'lit'

export const resultStyles = css`
  .result {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 400px;
    gap: var(--space-4);
    margin: 0 auto;
  }

  .result-content {
    width: 100%;

    &[hidden] {
      display: none;
    }
  }

  .result-actions {
    margin: 1rem 0 0 0;

    &[hidden] {
      display: none;
    }
  }
`
