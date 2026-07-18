import { css } from 'lit'

import { componentContentFrameStyles } from '@/components/domains/component/component.styles'
import { resetStyles } from '@/stylesheets/shared/reset.styles'

export const propStyles = [
  resetStyles,
  css`
    :host {
      display: block;
    }
    dt {
      display: flex;
      color: var(--foreground-subtle-color);
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
  componentContentFrameStyles,
  css`
    :host {
      display: block;
    }
    .component-props {
      height: 13rem;
      overflow: hidden;
      background-color: var(--background-subtle-color);
      position: relative;
      cursor: pointer;
      --component-content-frame-border: var(--border-transparent);
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
    .component-props.is-opened {
      height: auto;
      cursor: default;
    }
    .component-props.is-opened .component-props-more {
      display: none;
    }
  `,
]
