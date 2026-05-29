import { css } from 'lit'

export const linkStyles = css`
  .link {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    text-decoration: underline;
    text-decoration-skip-ink: auto;
    line-height: inherit;
    color: var(--color-primary);
  }
`
