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
      margin: var(--space-4) 0 0 var(--component-content-offset-inline-start);
      padding: var(--component-content-padding-block) var(--component-content-padding-inline);
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
        margin-inline: var(--component-content-bleed-inline);
        padding-inline: var(--layout-padding-inline);
        border-inline: 0;
        border-radius: 0;
      }
    }
  `,
]
