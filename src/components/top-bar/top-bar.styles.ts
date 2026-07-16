import { css } from 'lit'

export const topBarStyles = css`
  .top-bar {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding-block: var(--space-3);
    position: relative;
  }

  .top-bar > mm-paragraph {
    flex: 1;
  }

  ::slotted([slot='action']) {
    margin: 0 0 0 auto;
  }
`
