import { css } from 'lit'

export const tooltipStyles = css`
  :host {
    display: inline-flex;
    position: relative;
  }

  .tooltip {
    display: inline-flex;
    align-items: center;
    position: relative;
  }

  .tooltip-trigger {
    display: inline-flex;
    align-items: center;
  }

  .tooltip-content {
    opacity: 0;
    visibility: hidden;
    width: max-content;
    max-width: 320px;
    padding: 0.5rem var(--space-3);
    border-radius: var(--radius);
    background: var(--color-background-strong);
    box-shadow: var(--shadow);
    color: var(--color-foreground-on-solid);
    position: absolute;
    left: 0;
    top: calc(100% + var(--space-1));
    z-index: 6;
    pointer-events: none;
    transition: opacity 0.15s linear, visibility 0.15s linear;
  }

  .tooltip-content::before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    right: 50%;
    top: -8px;
    bottom: 0;
  }

  :host(:hover) .tooltip-content,
  :host(:focus-within) .tooltip-content,
  .tooltip[data-open='true'] .tooltip-content,
  .tooltip:hover .tooltip-content {
    opacity: 1;
    visibility: visible;
  }

  .tooltip[data-align='center'] .tooltip-content {
    white-space: pre;
    left: 50%;
    transform: translateX(-50%);
  }

  .tooltip[data-align='left'] .tooltip-content {
    white-space: pre;
  }

  .tooltip[data-align='right'] .tooltip-content {
    white-space: pre;
    left: auto;
    right: 0;
  }
`
