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
      line-height: var(--size-medium);
    }

    dd {
      margin: 0;
      line-height: var(--size-medium);
    }

    .dash {
    }

    .word-state {
      color: var(--color-orange-700);
    }
    .word-property {
      color: var(--color-cyan-700);
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
