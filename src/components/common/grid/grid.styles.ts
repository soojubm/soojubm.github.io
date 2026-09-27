import { css, unsafeCSS } from 'lit'

import { MEDIA } from '@/constants'
import { spaceTokens } from '@/stylesheets/shared.styles'
import { buildAttributeRules } from '@/utils'

const gridColumnsTokens = {
  1: { '--_col-count': '1' },
  3: { '--_col-count': '3' },
  /* 4열이 최소 너비로 들어가지 않으면 3열을 건너뛰고 컨테이너를 반으로 나눈다.
     기준 너비를 넘으면 clamp가 0px로 떨어져 N등분 계산이 그대로 이긴다. */
  4: {
    '--_col-count': '4',
    '--_col-pair':
      'clamp(0px, (4 * var(--_col-min, 12rem) + 3 * var(--_grid-gap) - 100%) * 9999, (100% - var(--_grid-gap)) / 2)',
  },
  6: { '--_col-count': '6' },
}

export const gridStyles = [
  css`
    :host {
      --_col-count: 2;
      --_col-pair: 0px;
      --_grid-gap: var(--space-4);

      display: grid;
      width: 100%;
      gap: var(--_grid-gap);
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
              calc((100% - (var(--_col-count) - 1) * var(--_grid-gap)) / var(--_col-count)),
              var(--_col-pair)
            )
          ),
          1fr
        )
      );
    }

    ::slotted(*) {
      min-width: 0;
    }

    ${unsafeCSS(buildAttributeRules('columns', gridColumnsTokens))}

    ${unsafeCSS(buildAttributeRules('gap', spaceTokens('--_grid-gap')))}

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

    :host([column-max-width][columns='6']) {
      grid-template-columns: repeat(6, minmax(0, var(--_col-max, 1fr)));
    }

    @media ${MEDIA.wide} {
      :host([column-max-width][columns='6']) {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }
    }

    @media ${MEDIA.narrow} {
      :host([column-max-width][columns='3']),
      :host([column-max-width][columns='4']),
      :host([column-max-width][columns='6']) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media ${MEDIA.compact} {
      :host([column-max-width][columns='2']),
      :host([column-max-width][columns='3']),
      :host([column-max-width][columns='4']),
      :host([column-max-width][columns='6']) {
        grid-template-columns: 1fr;
      }
    }
  `,
]
