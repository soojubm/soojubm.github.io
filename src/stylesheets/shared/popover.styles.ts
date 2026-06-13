import { css } from 'lit'

export const popoverStyles = css`
  .popover {
    padding: var(--space-1);
    border: var(--border-stronger);
    border-radius: var(--radius);
    background-color: var(--color-background);
    box-shadow: var(--shadow);

    opacity: 0;
    transform: translateY(-4px) scale(0.98);
    transform-origin: top left;
    visibility: hidden;
    pointer-events: none;
    transition: opacity 120ms ease, transform 180ms cubic-bezier(0.2, 0.8, 0.2, 1),
      visibility 0s linear 180ms;
  }

  .popover.open {
    opacity: 1;
    transform: translateY(0) scale(1);
    visibility: visible;
    pointer-events: auto;
    transition: opacity 120ms ease, transform 220ms cubic-bezier(0.18, 1.25, 0.4, 1), visibility 0s;
  }
`
