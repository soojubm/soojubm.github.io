import { css } from 'lit'

export const entityStyles = css`
  .entity {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    position: relative;
  }

  .entity-content {
    display: flex;
    flex-direction: column;
  }

  .entity-tag {
    position: absolute;
    left: var(--space-1-minus);
    top: var(--space-1-minus);
  }
`
