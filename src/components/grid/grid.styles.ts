import { css } from 'lit'
import { MEDIA } from '../../stylesheets/shared/breakpoints'
import { resetStyles } from '../../stylesheets/shared/reset.styles'

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

    .grid[data-columns='1'] {
      grid-template-columns: 1fr;
    }

    .grid[data-columns='2'] {
      grid-template-columns: repeat(2, minmax(0, var(--_col-max, 1fr)));
    }

    .grid[data-columns='3'] {
      grid-template-columns: repeat(3, minmax(0, var(--_col-max, 1fr)));
    }

    .grid[data-columns='4'] {
      grid-template-columns: repeat(4, minmax(0, var(--_col-max, 1fr)));
    }

    @media ${MEDIA.narrow} {
      .grid[data-columns='3'],
      .grid[data-columns='4'] {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media ${MEDIA.compact} {
      .grid[data-columns='2'],
      .grid[data-columns='3'],
      .grid[data-columns='4'] {
        grid-template-columns: 1fr;
      }
    }
  `,
]
