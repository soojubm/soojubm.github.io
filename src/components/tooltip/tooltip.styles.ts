import { css } from 'lit'

export const tooltipStyles = css`
  :host {
    display: inline-flex;
    position: relative;

    --tooltip-max-width: 320px;
    --tooltip-padding: 0.5rem var(--space-3);
    --tooltip-radius: var(--radius);
    --tooltip-color: var(--color-background-strong);
    --tooltip-text-color: var(--color-foreground-on-solid);
    --tooltip-shadow: var(--shadow);
  }

  :host(:hover) .tooltip-content,
  :host(:focus-within) .tooltip-content {
    opacity: 1;
    visibility: visible;
  }

  .tooltip {
    display: inline-flex;
    align-items: center;
    position: relative;

    &:hover .tooltip-content {
      opacity: 1;
      visibility: visible;
    }
  }

  :host([open]) .tooltip-content {
    opacity: 1;
    visibility: visible;
  }

  :host([placement='center']) .tooltip-content {
    white-space: pre;
    left: 50%;
    transform: translateX(-50%);
  }

  :host([placement='left']) .tooltip-content {
    white-space: pre;
  }

  :host([placement='right']) .tooltip-content {
    white-space: pre;
    left: auto;
    right: 0;
  }

  .tooltip-trigger {
    display: inline-flex;
    align-items: center;
  }

  .tooltip-content {
    opacity: 0;
    visibility: hidden;
    width: max-content;
    max-width: var(--tooltip-max-width);
    padding: var(--tooltip-padding);
    border-radius: var(--tooltip-radius);
    background: var(--tooltip-color);
    box-shadow: var(--tooltip-shadow);
    color: var(--tooltip-text-color);
    position: absolute;
    left: 0;
    top: calc(100% + var(--space-1));
    z-index: 6;
    pointer-events: none;
    transition: opacity 0.15s linear, visibility 0.15s linear;

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
