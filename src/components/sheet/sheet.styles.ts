import { css } from 'lit'

import { MEDIA } from '@/stylesheets/shared/breakpoints'

export const sheetStyles = css`
  :host {
    --sheet-z-index: var(--zindex-sheet);
    --sheet-backdrop-background-color: var(--color-backdrop);
    --sheet-background: var(--color-background);
    --sheet-border: 0;
    --sheet-shadow: none;
    --sheet-border-radius: var(--radius-large);
    --sheet-padding-inline: var(--space-4);
    --sheet-section-padding-block: var(--space-3);
    --sheet-body-padding-block-end: var(--space-4);
    --sheet-header-gap: var(--space-2);
    --sheet-max-height: 90vh;
    --sheet-bottom-max-width: calc(var(--layout-width-small) + var(--space-4) * 10);
    --sheet-side-max-width: 50vw;
    --sheet-side-responsive-max-width: 100vw;
    --sheet-width-small: var(--layout-width-tiny);
    --sheet-width-medium: var(--layout-width-tiny);
    --sheet-width-large: var(--layout-width-wide);
    --sheet-width-full: 100%;
    --sheet-height-full: 100%;
    --sheet-viewport-width: 100vw;
    --sheet-viewport-height: 100dvh;
    --sheet-viewport-max-height: 100vh;
    --sheet-transition-duration: 180ms;
    --sheet-transition-duration-emphasis: 220ms;
    --sheet-backdrop-blur: 2px;

    display: flex;
    width: var(--sheet-viewport-width);
    height: var(--sheet-viewport-height);
    justify-content: center;
    align-items: center;
    background: var(--sheet-backdrop-background-color);

    opacity: 0;
    visibility: hidden;
    pointer-events: none;

    position: fixed;
    inset: 0;
    z-index: var(--sheet-z-index);
    transition: opacity var(--sheet-transition-duration) ease,
      visibility 0s linear var(--sheet-transition-duration);
    backdrop-filter: blur(0px);
  }

  :host([backdrop-blur]) {
    backdrop-filter: blur(var(--sheet-backdrop-blur));
    transition: opacity var(--sheet-transition-duration) ease,
      visibility 0s linear var(--sheet-transition-duration),
      backdrop-filter var(--sheet-transition-duration) ease;
  }

  :host([open]) {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transition: opacity var(--sheet-transition-duration) ease, visibility 0s;
  }

  .sheet {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: var(--sheet-height, auto);
    max-height: var(--sheet-max-height);
    padding: 0 var(--sheet-padding-inline);
    border: var(--sheet-border);
    border-radius: var(--sheet-border-radius);
    background: var(--sheet-background);
    box-shadow: var(--sheet-shadow);
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    transform: scale(0.96);
    transition: transform var(--sheet-transition-duration) cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  :host([open][placement='center']) .sheet {
    transform: scale(1);
    transition: transform var(--sheet-transition-duration-emphasis) cubic-bezier(0.18, 1.25, 0.4, 1);
  }

  :host([open][placement='bottom']) .sheet {
    transform: translateY(0);
  }
  :host([open][placement='left']) .sheet {
    transform: translateX(0);
  }
  :host([open][placement='right']) .sheet {
    transform: translateX(0);
  }

  /* center + width */
  :host([placement='center']) .sheet {
    max-width: var(--sheet-width-medium);
  }
  :host([placement='center'][width='small']) .sheet {
    max-width: var(--sheet-width-small);
  }
  :host([placement='center'][width='large']) .sheet {
    max-width: var(--sheet-width-large);
  }
  :host([placement='center'][width='full']) .sheet {
    max-width: var(--sheet-width-full);
  }

  /* bottom */
  :host([placement='bottom']) .sheet {
    max-width: var(--sheet-bottom-max-width);
    border-bottom-left-radius: var(--sheet-border-radius);
    border-bottom-right-radius: var(--sheet-border-radius);
    margin-top: auto;
    transform: translateY(100%);
  }

  /* left */
  :host([placement='left']) .sheet {
    margin-right: auto;
    max-width: var(--sheet-side-max-width);
    height: var(--sheet-height-full);
    max-height: var(--sheet-viewport-max-height);
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    transform: translateX(-100%);
  }

  /* right */
  :host([placement='right']) .sheet {
    margin-left: auto;
    max-width: var(--sheet-side-max-width);
    height: var(--sheet-height-full);
    max-height: var(--sheet-viewport-max-height);
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    transform: translateX(100%);
  }

  @media ${MEDIA.small} {
    :host([placement='left']) .sheet,
    :host([placement='right']) .sheet {
      max-width: var(--sheet-side-responsive-max-width);
    }
  }
`
