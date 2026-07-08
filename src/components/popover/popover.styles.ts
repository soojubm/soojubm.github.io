import { css } from 'lit'

export const popoverStyles = css`
  :host {
    --popover-padding: var(--space-1);
    --popover-border: var(--border);
    --popover-border-radius: var(--radius);
    --popover-background-color: var(--color-background);
    --popover-shadow: var(--shadow);
    --popover-max-height: none;
    --popover-width: auto;
    --popover-offset: var(--space-1);
    --popover-transition-duration: 180ms;

    display: flex;
    flex-direction: column;
    width: var(--popover-width);
    max-height: var(--popover-max-height);
    padding: var(--popover-padding);
    border: var(--popover-border);
    border-radius: var(--popover-border-radius);
    background: var(--popover-background-color);
    box-shadow: var(--popover-shadow);
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
    position: absolute;
    top: calc(100% + var(--popover-offset));
    left: 0;
    right: 0;
    z-index: var(--zindex-popover);

    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transform: translateY(var(--space-1-minus));
    transition: opacity var(--popover-transition-duration) ease,
      transform var(--popover-transition-duration) cubic-bezier(0.2, 0.8, 0.2, 1),
      visibility 0s linear var(--popover-transition-duration);
  }

  :host([open]) {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: translateY(0);
    transition: opacity var(--popover-transition-duration) ease,
      transform var(--popover-transition-duration) cubic-bezier(0.2, 0.8, 0.2, 1), visibility 0s;
  }

  :host([placement='bottom-right']),
  :host([placement='top-right']) {
    left: auto;
    right: 0;
  }

  :host([placement='top-left']),
  :host([placement='top-right']) {
    top: auto;
    bottom: calc(100% + var(--popover-offset));
  }
`
