import { css } from 'lit'

export const toastStyles = css`
  :host {
    --toast-background-color: var(--color-background-strong);
    --toast-text-color: var(--color-foreground-on-solid);
    --toast-border-radius: var(--radius);
    --toast-padding-block: var(--space-2);
    --toast-padding-inline: var(--space-4);
    --toast-offset: var(--space-4);
    --toast-transition-duration: 200ms;

    display: flex;
    gap: var(--space-2);
    border-radius: var(--toast-border-radius);
    background: var(--toast-background-color);
    color: var(--toast-text-color);
    box-sizing: border-box;

    position: fixed;
    bottom: var(--toast-offset);
    left: 50%;
    z-index: var(--material-zindex-toast);

    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transform: translateX(-50%) translateY(calc(100% + var(--toast-offset)));
    transition: opacity var(--toast-transition-duration) ease,
      transform var(--toast-transition-duration) ease,
      visibility 0s linear var(--toast-transition-duration);
  }

  :host([open]) {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
    transition: opacity var(--toast-transition-duration) ease,
      transform var(--toast-transition-duration) ease, visibility 0s;
  }
`
