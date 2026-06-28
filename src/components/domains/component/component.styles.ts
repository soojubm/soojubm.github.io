import { css, unsafeCSS } from 'lit'

import { MEDIA } from '@/stylesheets/shared/breakpoints'

const componentContentFrameBaseStyles = css`
  margin: var(--component-content-frame-margin, 0 0 0 var(--component-content-offset-inline-start));
  padding: var(--component-content-padding-block) var(--component-content-padding-inline);
  border: var(--component-content-frame-border, var(--border));
  border-radius: var(--component-content-frame-radius, var(--radius-large));
`

const componentContentFrameSmallStyles = css`
  margin-inline: var(--component-content-bleed-inline);
  border-inline: 0;
  border-radius: 0;
`

export const componentContentFrameStylesFor = (selector: string) => css`
  ${unsafeCSS(selector)} {
    ${componentContentFrameBaseStyles}
  }

  @media ${MEDIA.small} {
    ${unsafeCSS(selector)} {
      ${componentContentFrameSmallStyles}
    }
  }
`

export const componentStageFrameStyles = css`
  .component-stage-frame {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-4);
    flex-wrap: wrap;
    background: var(--color-background-subtle);
  }
`
