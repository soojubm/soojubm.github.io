import { css } from 'lit'

import { scrollbarStyles } from '@/stylesheets/shared/scrollbar.styles'

export const popoverStyles = css`
  :host {
    --popover-width: auto;
    --popover-max-height: none;
    --popover-padding: var(--space-2) var(--space-4);
    --popover-border: var(--surface-high-border);
    --popover-border-radius: var(--radius);
    --popover-background-color: var(--surface-high-background-color);
    --popover-backdrop-filter: var(--surface-high-backdrop-filter);
    --popover-shadow: var(--surface-high-shadow);
    --popover-offset: var(--space-1);
    --popover-transition-duration: 180ms;

    /* 슬롯된 트리거를 감싸 popover 스스로 앵커(positioned wrapper)가 된다. */
    display: inline-block;
    position: relative;
  }

  .panel {
    display: flex;
    flex-direction: column;
    width: var(--popover-width);
    max-height: var(--popover-max-height);
    padding: var(--popover-padding);
    border: var(--popover-border);
    border-radius: var(--popover-border-radius);
    background: var(--popover-background-color);
    box-shadow: var(--popover-shadow);
    backdrop-filter: var(--popover-backdrop-filter);
    -webkit-backdrop-filter: var(--popover-backdrop-filter);
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
    position: absolute;
    top: calc(100% + var(--popover-offset));
    left: 0;
    right: 0;
    z-index: var(--material-zindex-overlay);

    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transform: translateY(var(--space-1-minus));
    transition: opacity var(--popover-transition-duration) ease,
      transform var(--popover-transition-duration) cubic-bezier(0.2, 0.8, 0.2, 1),
      visibility 0s linear var(--popover-transition-duration);

    ${scrollbarStyles};
  }

  :host([open]) .panel {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: translateY(0);
    transition: opacity var(--popover-transition-duration) ease,
      transform var(--popover-transition-duration) cubic-bezier(0.2, 0.8, 0.2, 1), visibility 0s;
  }

  :host([placement='bottom-right']) .panel,
  :host([placement='top-right']) .panel {
    left: auto;
    right: 0;
  }

  :host([placement='top-left']) .panel,
  :host([placement='top-right']) .panel {
    top: auto;
    bottom: calc(100% + var(--popover-offset));
  }
`
