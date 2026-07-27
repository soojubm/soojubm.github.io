import { css, unsafeCSS } from 'lit'

import { resetStyles, scrollbarStyles } from '@/stylesheets/shared.styles'
import { buildAttributeRules } from '@/utils'

// 이게 왜 필요..
const scrollDirectionTokens = {
  row: { 'flex-direction': 'row', 'overflow-x': 'auto', 'overflow-y': 'hidden' },
  column: {
    'flex-direction': 'column',
    'max-height': '100%',
    'overflow-x': 'hidden',
    'overflow-y': 'auto',
  },
}

export const scrollStyles = [
  resetStyles,
  css`
    :host {
      display: flex;
      gap: var(--scroll-gap, 0);
      min-width: 0;
      max-width: 100%;

      ${scrollbarStyles};
    }

    ${unsafeCSS(buildAttributeRules('direction', scrollDirectionTokens))}

    :host([hide-scrollbar]) {
      scrollbar-width: none;
    }

    :host([hide-scrollbar])::-webkit-scrollbar {
      display: none;
    }
  `,
]
