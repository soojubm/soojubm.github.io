import { css } from 'lit'
import { MEDIA } from '../../../stylesheets/shared/breakpoints'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'

export const componentExampleStyles = [
  resetStyles,
  css`
    :host {
      display: block;
    }

    .component-example {
      margin: 2.5rem 0 1rem calc(-5vw + 1rem);
      padding: 2rem calc(var(--layout-padding-inline) - 1rem);
      border: var(--border-stronger);
      border-left-color: var(--text-color);
      border-radius: var(--radius-large);
    }

    @media ${MEDIA.small} {
      .component-example {
        margin-inline: calc(var(--layout-padding-inline) * -1);
        padding-inline: var(--layout-padding-inline);
        border-inline: 0;
        border-radius: 0;
      }
    }
  `,
]
