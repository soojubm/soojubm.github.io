import { css } from 'lit'
import { MEDIA } from '@/stylesheets/shared/breakpoints'
import { resetStyles } from '@/stylesheets/shared/reset.styles'

export const gridStyles = [
  resetStyles,
  css`
    :host {
      display: block;
    }

    .grid {
      display: grid;
      width: 100%;
    }

    .grid > ::slotted(*) {
      min-width: 0;
    }

    :host([columns='1']) .grid {
      grid-template-columns: 1fr;
    }

    :host([columns='2']) .grid {
      grid-template-columns: repeat(2, minmax(0, var(--_col-max, 1fr)));
    }

    :host([columns='3']) .grid {
      grid-template-columns: repeat(3, minmax(0, var(--_col-max, 1fr)));
    }

    :host([columns='4']) .grid {
      grid-template-columns: repeat(4, minmax(0, var(--_col-max, 1fr)));
    }

    @media ${MEDIA.narrow} {
      :host([columns='3']) .grid,
      :host([columns='4']) .grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media ${MEDIA.compact} {
      :host([columns='2']) .grid,
      :host([columns='3']) .grid,
      :host([columns='4']) .grid {
        grid-template-columns: 1fr;
      }
    }
  `,
]
