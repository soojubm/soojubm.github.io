import { css } from 'lit'

export const userSnippetStyles = css`
  :host {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    position: relative;
  }

  .detail {
    display: flex;
    flex-direction: column;
  }

  mm-accent-tag {
    position: absolute;
    left: var(--space-1-minus);
    top: var(--space-1-minus);
  }
`
