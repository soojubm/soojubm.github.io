import { css } from 'lit'

export const tooltipStyles = css`
  :host {
    display: inline-flex;
    position: relative;

    --tooltip-max-width: 320px;
    --tooltip-padding: 0.5rem var(--space-3);
    --tooltip-border-radius: var(--radius);
    --tooltip-background-color: var(--background-strong-color);
    --tooltip-text-color: var(--foreground-color-on-solid);
    --tooltip-shadow: var(--surface-higher-shadow);
  }

  :host(:hover) [role='tooltip'],
  :host(:focus-within) [role='tooltip'] {
    opacity: 1;
    visibility: visible;
  }

  :host([open]) [role='tooltip'] {
    opacity: 1;
    visibility: visible;
  }

  :host([placement='center']) [role='tooltip'] {
    left: 50%;
    transform: translateX(-50%);
  }

  :host([placement='right']) [role='tooltip'] {
    left: auto;
    right: 0;
  }

  slot[name='trigger'] {
    display: inline-flex;
    align-items: center;
  }

  [role='tooltip'] {
    opacity: 0;
    visibility: hidden;
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
    z-index: var(--material-zindex-overlay);
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
