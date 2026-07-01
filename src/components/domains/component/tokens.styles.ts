import { css } from 'lit'

import { componentContentFrameStyles } from '@/components/domains/component/component.styles'
import { resetStyles } from '@/stylesheets/shared/reset.styles'

export const tokenStyles = [
  resetStyles,
  css`
    :host {
      display: flex;
      align-items: center;
      gap: var(--space-2);
    }

    dt {
      font-weight: var(--font-weight-bold);
    }

    dd {
      margin: 0;
    }

    .dash {
    }

    .word-0 {
      color: var(--gray800);
    }
    .word-1 {
    }
    .word-2 {
    }
    .word-3 {
      color: var(--color-orange-700);
    }
    .word-4 {
      color: var(--color-cyan-700);
    }
    .word-5 {
      color: var(--color-yellow-700);
    }
    .word-6 {
      color: var(--color-red-700);
    }
    .word-7 {
      color: var(--color-purple-700);
    }
  `,
]

export const componentTokensStyles = [
  resetStyles,
  componentContentFrameStyles,
  css`
    :host {
      display: block;
      margin-top: var(--space-4);
    }

    .component-tokens-title {
      display: none;
    }
  `,
]
