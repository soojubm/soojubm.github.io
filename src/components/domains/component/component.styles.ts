import { css, unsafeCSS } from 'lit'

import { surfaceBleedStyles } from '@/components/common/surface/surface.styles'
import { MEDIA } from '@/constants'
import { buildAttributeRules, type AttributeTokens } from '@/utils'

export const exampleWidthTokens: AttributeTokens<'narrow'> = {
  narrow: { '--component-content-max-width': 'var(--layout-width-narrow)' },
}

export const componentContentFrameStyles = css`
  /* 프레임 안 콘텐츠는 폭이 들쭉날쭉하지 않도록 좁은 폭을 기본으로 두고, 넓어야 하는 시연만 full-width로 푼다. */
  :host {
    --component-content-max-width: calc(var(--size-80) * 6);
  }

  :host([full-width]) {
    --component-content-max-width: none;
  }

  ::slotted(*) {
    max-width: var(--component-content-max-width);
  }

  .component-content-frame {
    --component-content-margin-inline-start: calc(
      var(--layout-padding-inline) * -1 + var(--space-4)
    );
    --component-content-padding-block: var(--space-8);
    --component-content-padding-inline: calc(var(--layout-padding-inline) - var(--space-4));
    --component-content-margin: 0 0 0 var(--component-content-margin-inline-start);
    --component-content-border: var(--border);
    --surface-border-radius: var(--border-radius-large);

    position: relative;
    margin: var(--component-content-margin);
    padding: var(--component-content-padding-block) var(--component-content-padding-inline);
    border: var(--component-content-border);
    border-radius: var(--surface-border-radius);
  }

  @media ${MEDIA.default} {
    .component-content-frame {
      --component-content-padding-inline: var(--layout-padding-inline);

      ${surfaceBleedStyles};
      /* 블록 요소라 음수 margin만으로 넓어진다. 너비를 지정하면 margin을 덮어쓴 프레임이 넘친다. */
      width: auto;
    }
  }
`

export const componentPropsStyles = [
  componentContentFrameStyles,
  css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }
    .component-props {
      height: 8.5rem;
      overflow: hidden;
      background-color: var(--background-subtle-color);
      position: relative;
      cursor: pointer;
      --component-content-border: var(--border-transparent);
      --component-content-padding-block: var(--space-6);
    }
    .component-props-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
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
    :host([open]) .component-props {
      height: auto;
      cursor: default;
    }
    :host([open]) .component-props-more {
      display: none;
    }
  `,
]

export const componentTokensStyles = [
  componentContentFrameStyles,
  css`
    :host {
      display: block;
      margin-top: var(--space-4);
    }
  `,
]
