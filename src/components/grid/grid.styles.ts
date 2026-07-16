import { css } from 'lit'

import { MEDIA } from '@/stylesheets/shared/breakpoints'
import { resetStyles } from '@/stylesheets/shared/reset.styles'

export const gridStyles = [
  resetStyles,
  css`
    :host {
      --_col-count: 2;

      display: grid;
      width: 100%;
      gap: var(--_grid-gap, var(--space-4));
      justify-content: var(--_grid-justify-content, normal);
      /* columns는 상한: 넓을 때는 컨테이너를 N등분해 정확히 N열이 되고,
         한 열이 최소 너비 아래로 좁아지면 열 수가 컨테이너 너비 기준으로 줄어든다. */
      grid-template-columns: repeat(
        auto-fill,
        minmax(
          min(
            100%,
            max(
              var(--_col-min, 12rem),
              calc(
                (100% - (var(--_col-count) - 1) * var(--_grid-gap, var(--space-4))) /
                  var(--_col-count)
              )
            )
          ),
          1fr
        )
      );
    }

    ::slotted(*) {
      min-width: 0;
    }

    :host([columns='1']) {
      --_col-count: 1;
    }

    :host([columns='3']) {
      --_col-count: 3;
    }

    :host([columns='4']) {
      --_col-count: 4;
    }

    /* column-max-width 그리드는 auto-fill로 열 수를 파생하면 상한(columns)을 넘을 수
       있어 고정 열 수를 유지하고, 뷰포트 미디어 쿼리로만 줄인다. */
    :host([column-max-width][columns='1']) {
      grid-template-columns: 1fr;
    }

    :host([column-max-width][columns='2']) {
      grid-template-columns: repeat(2, minmax(0, var(--_col-max, 1fr)));
    }

    :host([column-max-width][columns='3']) {
      grid-template-columns: repeat(3, minmax(0, var(--_col-max, 1fr)));
    }

    :host([column-max-width][columns='4']) {
      grid-template-columns: repeat(4, minmax(0, var(--_col-max, 1fr)));
    }

    :host([columns='6']) {
      grid-template-columns: repeat(6, minmax(0, var(--_col-max, 1fr)));
    }

    @media ${MEDIA.narrow} {
      :host([column-max-width][columns='3']),
      :host([column-max-width][columns='4']) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media ${MEDIA.compact} {
      :host([column-max-width][columns='2']),
      :host([column-max-width][columns='3']),
      :host([column-max-width][columns='4']) {
        grid-template-columns: 1fr;
      }
    }
  `,
]
