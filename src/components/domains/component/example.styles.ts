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
      margin: var(--space-8) 0 var(--space-4) var(--component-content-offset-inline-start);
      padding: var(--component-content-padding-block) var(--component-content-padding-inline);
      border: var(--border);
      border-left-color: var(--text-color);
      border-radius: var(--radius-large);
    }

    @media ${MEDIA.small} {
      .component-example {
        margin-inline: var(--component-content-bleed-inline);
        padding-inline: var(--layout-padding-inline);
        border-inline: 0;
        border-radius: 0;
      }
    }
  `,
]
