import { css } from 'lit'

import { MEDIA } from '@/constants'
import { resetStyles } from '@/stylesheets/shared.styles'

export const componentContentFrameStyles = css`
  .component-content-frame {
    --component-content-offset-inline-start: calc(
      var(--layout-padding-inline) * -1 + var(--space-4)
    );
    --component-content-padding-block: var(--space-8);
    --component-content-padding-inline: calc(var(--layout-padding-inline) - var(--space-4));
    --component-content-bleed-inline: calc(var(--layout-padding-inline) * -1);
    --component-content-frame-margin: 0 0 0 var(--component-content-offset-inline-start);
    --component-content-frame-border: var(--border);
    --component-content-frame-border-radius: var(--radius-large);

    position: relative;
    margin: var(--component-content-frame-margin);
    padding: var(--component-content-padding-block) var(--component-content-padding-inline);
    border: var(--component-content-frame-border);
    border-radius: var(--component-content-frame-border-radius);
  }

  @media ${MEDIA.default} {
    .component-content-frame {
      --component-content-padding-inline: var(--layout-padding-inline);

      margin-inline: var(--component-content-bleed-inline);
      border-inline: 0;
      border-radius: 0;
    }
  }
`

export const componentExampleStyles = [
  resetStyles,
  componentContentFrameStyles,
  css`
    :host {
      display: block;
    }

    .component-example {
      --component-content-frame-margin: 0 0 var(--space-4)
        var(--component-content-offset-inline-start);

      border-left-color: var(--foreground-color);
    }
  `,
]

export const componentPropsStyles = [
  resetStyles,
  componentContentFrameStyles,
  css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }
    .component-props {
      height: 10rem;
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

export const tokenStyles = [
  resetStyles,
  css`
    .token-row {
      display: flex;
      align-items: center;
      gap: var(--space-3);
    }

    .token-category {
      width: 100px;
    }

    .token-prop {
      margin-left: auto;
    }
  `,
]

export const componentTokensStyles = [
  css`
    .token-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }
  `,
  resetStyles,
  componentContentFrameStyles,
  css`
    :host {
      display: block;
      margin-top: var(--space-4);
    }
  `,
]
