import { css } from 'lit'

import { focusRing } from '@/stylesheets/shared/focus-ring.styles'

export const linkStyles = css`
  :host {
    --link-text-color: var(--color-primary);
    --link-gap: var(--space-1);
  }

  .link {
    display: inline-flex;
    align-items: center;
    gap: var(--link-gap);
    border-radius: var(--radius);
    text-decoration: underline;
    text-decoration-skip-ink: auto;
    line-height: inherit;
    color: var(--link-text-color);
  }

  .link:focus-visible {
    ${focusRing}
  }
`
