import { css } from 'lit'

import { componentContentFrameStylesFor } from '@/components/domains/component/component.styles'
import { resetStyles } from '@/stylesheets/shared/reset.styles'

export const componentExampleStyles = [
  resetStyles,
  componentContentFrameStylesFor('.component-example'),
  css`
    :host {
      display: block;
    }

    .component-example {
      --component-content-frame-margin: var(--space-8) 0 var(--space-4)
        var(--component-content-offset-inline-start);

      border-left-color: var(--color-foreground);
    }
  `,
]
