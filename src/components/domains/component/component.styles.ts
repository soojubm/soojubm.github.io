import { css } from 'lit'

import { MEDIA } from '@/stylesheets/shared/breakpoints'

export const componentContentFrameStyles = css`
  .component-content-frame {
    --component-content-offset-inline-start: calc(
      var(--layout-padding-inline) * -1 + var(--space-4)
    );
    --component-content-padding-block: var(--space-8);
    --component-content-padding-inline: calc(var(--layout-padding-inline) - var(--space-4));
    --component-content-bleed-inline: calc(var(--layout-padding-inline) * -1);

    position: relative;
    margin: var(
      --component-content-frame-margin,
      0 0 0 var(--component-content-offset-inline-start)
    );
    padding: var(--component-content-padding-block) var(--component-content-padding-inline);
    border: var(--component-content-frame-border, var(--border));
    border-radius: var(--component-content-frame-border-radius, var(--radius-large));
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
