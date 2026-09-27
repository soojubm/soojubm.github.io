import { css, unsafeCSS } from 'lit'

import { scrollbarStyles, spaceTokens, type FlexDirection } from '@/stylesheets/shared.styles'
import { buildAttributeRules, type AttributeTokens } from '@/utils'

// 이게 왜 필요..
const scrollDirectionTokens: AttributeTokens<FlexDirection> = {
  row: { 'flex-direction': 'row', 'overflow-x': 'auto', 'overflow-y': 'hidden' },
  column: {
    'flex-direction': 'column',
    'max-height': '100%',
    'overflow-x': 'hidden',
    'overflow-y': 'auto',
  },
}

export const scrollStyles = [
  css`
    :host {
      --scroll-gap: 0;

      display: flex;
      gap: var(--scroll-gap);
      min-width: 0;
      max-width: 100%;

      ${scrollbarStyles};
    }

    ${unsafeCSS(buildAttributeRules('direction', scrollDirectionTokens))}

    ${unsafeCSS(buildAttributeRules('gap', spaceTokens('--scroll-gap')))}

    /* 항목은 줄어들어 프레임에 맞추지 않고 제 크기로 넘쳐 스크롤된다. */
    ::slotted(*) {
      flex-shrink: 0;
    }

    :host([hide-scrollbar]) {
      scrollbar-width: none;
    }

    :host([hide-scrollbar])::-webkit-scrollbar {
      display: none;
    }
  `,
]
