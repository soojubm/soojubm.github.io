import { css } from 'lit'

import { scrollbarStyles } from '@/stylesheets/shared/scrollbar.styles'

export const popoverStyles = css`
  :host {
    --popover-padding: var(--space-1);
    --popover-border: var(--surface-higher-border);
    --popover-border-radius: var(--radius);
    --popover-background-color: var(--surface-higher-background-color);
    --popover-backdrop-filter: var(--surface-higher-backdrop-filter);
    --popover-shadow: var(--surface-higher-shadow);
    --popover-max-height: none;
    --popover-width: auto;
    --popover-offset: var(--space-1);
    --popover-transition-duration: 180ms;

    /* 트리거가 없으면 host는 박스를 만들지 않고, 패널은 소비자의 positioned 조상에 앵커된다. */
    display: contents;
  }

  /* 트리거를 슬롯으로 받으면 popover가 스스로 앵커(positioned wrapper)를 책임진다. */
  :host([with-trigger]) {
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

    ${scrollbarStyles}
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
