import { css } from 'lit'

export const entityStyles = css`
  .entity {
    position: relative;
  }

  .entity[data-alignment='center'] {
    text-align: center;
  }

  .entity-label {
    display: block;
    margin: 0.5rem 0 0;
    font-size: var(--font-size-medium);
    font-weight: var(--font-weight-bold);
  }

  .entity ::slotted([slot='tag']) {
    position: absolute;
    left: var(--space-1-minus);
    top: var(--space-1-minus);
  }
`
