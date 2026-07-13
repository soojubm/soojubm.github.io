import { css } from 'lit'

import { MEDIA } from '@/stylesheets/shared/breakpoints'

export const componentContentFrameStyles = css`
  .component-content-frame {
    margin: var(
      --component-content-frame-margin,
      0 0 0 var(--component-content-offset-inline-start)
    );
    padding: var(--component-content-padding-block) var(--component-content-padding-inline);
    border: var(--component-content-frame-border, var(--border));
    border-radius: var(--component-content-frame-border-radius, var(--radius-large));
  }

  @media ${MEDIA.small} {
    .component-content-frame {
      margin-inline: var(--component-content-bleed-inline);
      border-inline: 0;
      border-radius: 0;
    }
  }
`
