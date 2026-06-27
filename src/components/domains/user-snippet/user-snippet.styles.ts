import { css } from 'lit'

export const entityStyles = css`
  .entity {
    position: relative;
  }

  .entity-description {
    margin-top: calc(var(--space-05) * -1);
  }

  .entity-tag {
    position: absolute;
    left: var(--space-1-minus);
    top: var(--space-1-minus);
  }
`
