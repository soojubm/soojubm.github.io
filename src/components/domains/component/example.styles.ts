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
      margin: var(--space-8) 0 var(--space-4)
        calc(var(--layout-padding-inline) * -1 + var(--space-4));
      padding: var(--space-8) calc(var(--layout-padding-inline) - var(--space-4));
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
