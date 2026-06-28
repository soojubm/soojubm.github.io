import { css } from 'lit'

import { componentContentFrameStylesFor } from '@/components/domains/component/component.styles'
import { resetStyles } from '@/stylesheets/shared/reset.styles'

export const tokenStyles = [
  resetStyles,
  css`
    :host {
      display: flex;
      flex-direction: column;
    }

    dt {
      color: var(--color-foreground-light);
      line-height: 1.2;
    }

    .value {
      display: flex;
      margin-bottom: var(--space-3);
    }
  `,
]

export const componentTokensStyles = [
  resetStyles,
  componentContentFrameStylesFor('.component-tokens'),
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
