import { css, unsafeCSS } from 'lit'

import type { TooltipPlacement } from '@/components/overlay/tooltip/tooltip'

import { buildAttributeRules, type AttributeTokens } from '@/utils'

const tooltipPlacementTokens: AttributeTokens<Exclude<TooltipPlacement, 'bottom-start'>> = {
  bottom: { left: '50%', transform: 'translateX(-50%)' },
  'bottom-end': { left: 'auto', right: '0' },
}

export const tooltipStyles = css`
  :host {
    display: inline-flex;
    position: relative;

    --tooltip-max-width: 280px;
    --tooltip-padding: 0.5rem var(--space-3);
    --tooltip-border-radius: var(--radius);
    --tooltip-background-color: var(--background-strong-color);
    --tooltip-text-color: var(--background-color);
    --tooltip-shadow: var(--material-base-shadow);
  }

  :host([open]) [role='tooltip'] {
    display: block;
    opacity: 1;

    @starting-style {
      opacity: 0;
    }
  }

  ${unsafeCSS(buildAttributeRules('placement', tooltipPlacementTokens, "[role='tooltip']"))}

  slot[name='trigger'] {
    display: inline-flex;
    align-items: center;
  }

  [role='tooltip'] {
    /* 트리거보다 넓은 말풍선이 스크롤 컨테이너 안에서 스크롤 영역을 넓히지 않도록
       닫힐 때 레이아웃에서 빼고, display를 이산 전환해 fade-out은 남긴다. */
    display: none;
    opacity: 0;
    width: max-content;
    max-width: var(--tooltip-max-width);
    padding: var(--tooltip-padding);
    border-radius: var(--tooltip-border-radius);
    background: var(--tooltip-background-color);
    box-shadow: var(--tooltip-shadow);
    color: var(--tooltip-text-color);
    position: absolute;
    left: 0;
    top: calc(100% + var(--space-1));
    z-index: var(--material-zindex-tooltip);
    pointer-events: none;
    transition: opacity var(--transition-duration) var(--transition-easing),
      display var(--transition-duration) var(--transition-easing) allow-discrete;

    &::before {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      right: 50%;
      top: -8px;
      bottom: 0;
    }
  }
`
