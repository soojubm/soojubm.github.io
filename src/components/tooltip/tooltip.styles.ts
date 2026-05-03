import { css } from 'lit'

export const tooltipStyles = css`
  .tooltip {
    position: relative;
  }

  .tooltip-trigger {
    display: flex;
    align-items: center;
    height: var(--size-small);
  }

  .tooltip-content {
    display: none;
    width: max-content;
    max-width: 320px;
    padding: 0.5rem var(--space-3);
    border-radius: var(--radius);
    background: var(--color-background-strong);
    box-shadow: var(--shadow);
    color: var(--color-foreground-on-solid);
    position: absolute;
    left: 0;
    top: var(--size-medium);
    z-index: 6;
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

  .tooltip:hover .tooltip-content {
    display: block;
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
