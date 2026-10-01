import { css, unsafeCSS } from 'lit'

import type { TooltipPlacement } from '@/components/overlay/tooltip/tooltip'

import { buildAttributeRules, type AttributeTokens } from '@/utils'

// 말풍선이 트리거의 어느 모서리에 맞춰질지. 기준 좌표(--tooltip-bubble-anchor-*)는 말풍선이 열릴 때 잰다.
const tooltipPlacementTokens: AttributeTokens<Exclude<TooltipPlacement, 'bottom-start'>> = {
  bottom: {
    left: 'calc((var(--tooltip-bubble-anchor-left) + var(--tooltip-bubble-anchor-right)) / 2)',
    transform: 'translateX(-50%)',
  },
  'bottom-end': { left: 'var(--tooltip-bubble-anchor-right)', transform: 'translateX(-100%)' },
}

export const tooltipTriggerStyles = css`
  :host {
    display: inline-flex;
  }

  slot[name='trigger'] {
    display: inline-flex;
    align-items: center;
  }
`

export const tooltipBubbleStyles = css`
  :host {
    --tooltip-bubble-max-width: 280px;
    --tooltip-bubble-padding: 0.5rem var(--space-3);
    --tooltip-bubble-border-radius: var(--radius);
    --tooltip-bubble-background-color: var(--background-strong-color);
    --tooltip-bubble-text-color: var(--background-color);
    --tooltip-bubble-shadow: var(--material-base-shadow);

    display: block;
    width: max-content;
    max-width: var(--tooltip-bubble-max-width);
    padding: var(--tooltip-bubble-padding);
    border-radius: var(--tooltip-bubble-border-radius);
    background: var(--tooltip-bubble-background-color);
    box-shadow: var(--tooltip-bubble-shadow);
    color: var(--tooltip-bubble-text-color);
    box-sizing: border-box;

    position: fixed;
    top: calc(var(--tooltip-bubble-anchor-bottom) + var(--space-1));
    left: var(--tooltip-bubble-anchor-left);
    z-index: var(--material-zindex-tooltip);

    /* 호스트가 표면 자체라 여기서 뜨고 진다. 닫힐 때만 visibility를 지연시켜 fade-out을 남긴다. */
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity var(--transition-duration) var(--transition-easing),
      visibility 0s linear var(--transition-duration);
  }

  /* 처음 열릴 때도 fade-in이 재생되도록, 만들어지는 순간의 시작 스타일을 밝힌다. */
  :host([open]) {
    opacity: 1;
    visibility: visible;
    transition: opacity var(--transition-duration) var(--transition-easing), visibility 0s;

    @starting-style {
      opacity: 0;
    }
  }

  ${unsafeCSS(buildAttributeRules('placement', tooltipPlacementTokens))}
`
