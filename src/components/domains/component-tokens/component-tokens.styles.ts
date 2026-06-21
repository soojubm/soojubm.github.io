import { css } from 'lit'
import { MEDIA } from '../../../stylesheets/shared/breakpoints'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'

export const tokenStyles = [
  resetStyles,
  css`
    :host {
      display: contents;
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
      margin: 1rem 0 0 calc(-5vw + 1rem);
      padding: 1.5rem calc(var(--layout-padding-inline) - 1rem);
      border: var(--border-stronger);
      border-radius: var(--radius-large);
    }

    dl {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: var(--space-2) 1.5rem;
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
