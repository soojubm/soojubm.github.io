import { css } from 'lit'

export const featureStyles = css`
  .feature-item {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: var(--space-3);
    position: relative;
    z-index: 1;
  }

  .feature-item[data-variant='simple'] {
    padding: 2rem;
    box-sizing: border-box;
    border-radius: var(--radius);
    background: var(--color-background-subtle);
  }

  @media (--tiny) {
    .feature-item {
      max-width: 100%;
    }
  }
`
