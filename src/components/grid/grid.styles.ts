import { css } from 'lit'

import { MEDIA } from '@/stylesheets/shared/breakpoints'
import { resetStyles } from '@/stylesheets/shared/reset.styles'

export const gridStyles = [
  resetStyles,
  css`
    :host {
      display: grid;
      width: 100%;
      gap: var(--_grid-gap, var(--space-4));
      justify-content: var(--_grid-justify-content, normal);
    }

    ::slotted(*) {
      min-width: 0;
    }

    :host([columns='1']) {
      grid-template-columns: 1fr;
    }

    :host([columns='2']) {
      grid-template-columns: repeat(2, minmax(0, var(--_col-max, 1fr)));
    }

    :host([columns='3']) {
      grid-template-columns: repeat(3, minmax(0, var(--_col-max, 1fr)));
    }

    :host([columns='4']) {
      grid-template-columns: repeat(4, minmax(0, var(--_col-max, 1fr)));
    }

    @media ${MEDIA.narrow} {
      :host([columns='3']),
      :host([columns='4']) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media ${MEDIA.compact} {
      :host([columns='2']),
      :host([columns='3']),
      :host([columns='4']) {
        grid-template-columns: 1fr;
      }
    }
  `,
]
