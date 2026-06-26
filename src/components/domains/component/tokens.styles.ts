import { css } from 'lit'
import { MEDIA } from '../../../stylesheets/shared/breakpoints'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'

export const tokenStyles = [
  resetStyles,
  css`
    :host {
      display: grid;
      grid-column: 1 / -1;
      grid-template-columns: subgrid;
    }

    .meta {
      display: flex;
      flex-direction: column;
    }
  `,
]

export const componentTokensStyles = [
  resetStyles,
  css`
    :host {
      display: block;
    }

    .component-tokens {
      margin: var(--space-4) 0 0 calc(var(--layout-padding-inline) * -1 + var(--space-4));
      padding: var(--space-8) calc(var(--layout-padding-inline) - var(--space-4));
      border: var(--border);
      border-radius: var(--radius-large);
    }

    dl {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: var(--space-2) var(--space-4);
      margin: 0;
    }

    @media ${MEDIA.small} {
      .component-tokens {
        margin-inline: calc(var(--layout-padding-inline) * -1);
        padding-inline: var(--layout-padding-inline);
        border-inline: 0;
        border-radius: 0;
      }
    }
  `,
]
