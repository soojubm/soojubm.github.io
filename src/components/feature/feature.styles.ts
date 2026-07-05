import { css } from 'lit'

export const featureStyles = css`
  :host {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-3);
    width: 100%;
    position: relative;
    z-index: 1;
  }

  :host([centered]) {
    align-items: center;
  }

  .feature-emoji {
    font-size: var(--font-size-24);
  }
`
