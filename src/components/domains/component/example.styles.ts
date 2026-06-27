import { css } from 'lit'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'
import { componentContentFrameStyles } from './component.styles'

export const componentExampleStyles = [
  resetStyles,
  componentContentFrameStyles,
  css`
    :host {
      display: block;
    }

    .component-example {
      --component-content-frame-margin: var(--space-8) 0 var(--space-4)
        var(--component-content-offset-inline-start);

      border-left-color: var(--text-color);
    }
  `,
]
