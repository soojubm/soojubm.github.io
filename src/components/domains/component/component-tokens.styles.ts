import { css } from 'lit'

import { componentContentFrameStyles } from '@/components/domains/component/component.styles'
import { resetStyles } from '@/stylesheets/shared.styles'

export const tokenStyles = [resetStyles]

export const componentTokensStyles = [
  resetStyles,
  componentContentFrameStyles,
  css`
    :host {
      display: block;
      margin-top: var(--space-4);
    }
  `,
]
