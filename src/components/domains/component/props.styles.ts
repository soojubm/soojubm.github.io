import { css } from 'lit'
import { MEDIA } from '../../../stylesheets/shared/breakpoints'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'

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
  css`
    :host {
      display: block;
    }
    .component-props {
      height: 12rem;
      overflow: hidden;
      margin: 0 0 0 calc(-5vw + 1rem);
      padding: 1.5rem calc(var(--layout-padding-inline) - 1rem);
      background-color: var(--color-background-subtle);
      border: var(--component-props-border, none);
      border-radius: var(--radius-large);
      position: relative;
      cursor: pointer;
    }
    .component-props-more {
      display: flex;
      padding: 0.75rem 2rem 1rem calc(var(--layout-padding-inline) - 1rem);
      background-color: inherit;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
    }
    ::slotted(mm-text[size='18']) {
      display: none;
    }
    .component-props.is-opened {
      height: auto;
      cursor: default;
    }
    .component-props.is-opened .component-props-more {
      display: none;
    }

    @media ${MEDIA.small} {
      .component-props {
        margin-inline: calc(var(--layout-padding-inline) * -1);
        padding-inline: var(--layout-padding-inline);
        border-inline: 0;
        border-radius: 0;
      }
      .component-props-more {
        padding-inline: var(--layout-padding-inline);
      }
    }
  `,
]
