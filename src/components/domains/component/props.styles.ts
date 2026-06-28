import { css } from 'lit'

import { componentContentFrameStylesFor } from '@/components/domains/component/component.styles'
import { resetStyles } from '@/stylesheets/shared/reset.styles'

export const propStyles = [
  resetStyles,
  css`
    :host {
      display: block;
    }
    dt {
      display: flex;
      color: var(--color-foreground-light);
      line-height: 20px;
    }
    dt attr {
      font-size: var(--font-size-12);
    }

    dd {
      font-style: normal;
      font-weight: var(--font-weight-normal);
      font-size: var(--font-size-14);
    }
    :host(:not(:first-child)) dt {
      margin-top: var(--space-3);
    }
  `,
]

export const componentPropsStyles = [
  resetStyles,
  componentContentFrameStylesFor('.component-props'),
  css`
    :host {
      display: block;
    }
    .component-props {
      height: 13rem;
      overflow: hidden;
      background-color: var(--color-background-subtle);
      position: relative;
      cursor: pointer;
      --component-content-frame-border: var(--component-props-border, none);
    }
    .component-props-more {
      display: flex;
      padding: 0.75rem var(--component-content-padding-inline) 2rem;
      background-color: inherit;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
    }
    .component-props[data-opened='true'] {
      height: auto;
      cursor: default;
    }
    .component-props[data-opened='true'] .component-props-more {
      display: none;
    }
  `,
]
