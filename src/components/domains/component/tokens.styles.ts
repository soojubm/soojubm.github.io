import { css } from 'lit'
import { resetStyles } from '@/stylesheets/shared/reset.styles'
import { componentContentFrameStyles } from '@/components/domains/component/component.styles'

export const tokenStyles = [
  resetStyles,
  css`
    :host {
      display: grid;
      grid-column: 1 / -1;
      grid-template-columns: subgrid;
    }

    .meta {
      display: flex;
      flex-direction: column;
    }
  `,
]

export const componentTokensStyles = [
  resetStyles,
  componentContentFrameStyles,
  css`
    :host {
      display: block;
    }

    .component-tokens {
      --component-content-frame-margin: var(--space-4) 0 0
        var(--component-content-offset-inline-start);
    }

    dl {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: var(--space-2) var(--space-4);
      margin: 0;
    }
  `,
]
