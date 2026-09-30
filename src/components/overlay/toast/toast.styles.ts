import { css } from 'lit'

export const toastStyles = css`
  :host {
    --toast-min-width: 25vw;
    --toast-min-height: var(--size-48);
    --toast-gap: var(--space-2);
    --toast-background-color: var(--background-strong-color);
    --toast-text-color: var(--background-color);
    --toast-border-radius: var(--radius-large);
    --toast-padding-block: var(--space-2);
    --toast-padding-inline: var(--space-4);
    --toast-offset: var(--space-4);

    display: flex;
    min-width: var(--toast-min-width);
    align-items: center;
    min-height: var(--toast-min-height);
    gap: var(--toast-gap);
    padding: var(--toast-padding-block) var(--toast-padding-inline);
    border-radius: var(--toast-border-radius);
    background: var(--toast-background-color);
    color: var(--toast-text-color);
    box-sizing: border-box;

    position: fixed;
    bottom: var(--toast-offset);
    left: 50%;
    z-index: var(--material-zindex-toast);

    /* 호스트가 표면 자체라 여기서 뜨고 진다. 닫힐 때만 visibility를 지연시킨다. */
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transform: translateX(-50%) translateY(calc(100% + var(--toast-offset)));
    transition: opacity var(--transition-duration) var(--transition-easing),
      transform var(--transition-duration) var(--transition-easing),
      visibility 0s linear var(--transition-duration);
  }

  :host([open]) {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: translateX(-50%) translateY(0);
    transition: opacity var(--transition-duration) var(--transition-easing),
      transform var(--transition-duration) var(--transition-easing), visibility 0s;
  }
`
