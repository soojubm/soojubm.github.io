import { css } from 'lit'

export const topBarStyles = css`
  .top-bar {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding-block: var(--space-4);
    position: relative;
  }

  .top-bar > mm-paragraph {
    flex: 1;
  }

  .is-sticky-top-bar {
    & .top-bar {
      position: fixed;
      top: 0;
    }
    & .top-bar-background {
      box-shadow: var(--shadow);
    }
  }

  ::slotted([slot='action']) {
    margin: 0 0 0 auto;
  }
`
