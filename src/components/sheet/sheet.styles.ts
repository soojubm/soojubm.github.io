import { css } from 'lit'
import { MEDIA } from '../../stylesheets/shared/breakpoints'

export const sheetElementStyles = css`
  .sheet {
    display: flex;
    flex-direction: column;
    background: var(--color-background);
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
  }

  .sheet[variant='anchor'] {
    padding: var(--space-1);
    border: var(--border-stronger);
    border-radius: var(--radius);
    box-shadow: var(--shadow);

    opacity: 0;
    transform: translateY(var(--space-1-minus)) scale(0.98);
    transform-origin: top left;
    visibility: hidden;
    pointer-events: none;
    transition: opacity 120ms ease, transform 180ms cubic-bezier(0.2, 0.8, 0.2, 1),
      visibility 0s linear 180ms;
  }

  .sheet[open][variant='anchor'] {
    opacity: 1;
    transform: translateY(0) scale(1);
    visibility: visible;
    pointer-events: auto;
    transition: opacity 120ms ease, transform 220ms cubic-bezier(0.18, 1.25, 0.4, 1), visibility 0s;
  }
`

export const sheetStyles = [
  css`
    :host {
      --sheet-z-index: var(--zindex-sheet);
      --sheet-backdrop-color: var(--color-backdrop);
      --sheet-radius: var(--radius-large);
      --sheet-bottom-max-width: calc(var(--layout-width-small) + var(--space-4) * 10);
      --sheet-anchor-width: var(--layout-width-tiny);
      --sheet-anchor-max-height: calc(var(--width-small) * 2);
      --sheet-width-small: var(--sheet-anchor-width);
      --sheet-width-medium: var(--layout-width-tiny);
      --sheet-width-large: var(--layout-width-wide);
      --sheet-width-full: 100%;

      display: flex;
      width: 100vw;
      height: 100dvh;
      justify-content: center;
      align-items: center;
      background: var(--sheet-backdrop-color);

      opacity: 0;
      visibility: hidden;
      pointer-events: none;

      position: fixed;
      inset: 0;
      z-index: var(--sheet-z-index);
      transition: opacity 180ms ease, visibility 0s linear 180ms;
      backdrop-filter: blur(0px);
    }

    :host([backdrop-blur]) {
      backdrop-filter: blur(2px);
      transition: opacity 180ms ease, visibility 0s linear 180ms, backdrop-filter 180ms ease;
    }

    :host([open]) {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
      transition: opacity 180ms ease, visibility 0s;
    }

    .sheet {
      width: 100%;
      max-height: 90vh;
      padding: 0 var(--space-4);
      border-radius: var(--sheet-radius);
      transform: scale(0.96);
      transition: transform 180ms cubic-bezier(0.2, 0.8, 0.2, 1);
    }

    :host([open][variant='center']) .sheet {
      transform: scale(1);
      transition: transform 220ms cubic-bezier(0.18, 1.25, 0.4, 1);
    }

    :host([open][variant='bottom']) .sheet {
      transform: translateY(0);
    }
    :host([open][variant='left']) .sheet {
      transform: translateX(0);
    }
    :host([open][variant='right']) .sheet {
      transform: translateX(0);
    }
    :host([open][variant='inline']) .sheet {
      transform: translateY(0);
    }

    /* center + width */
    :host([variant='center']) .sheet {
      max-width: var(--sheet-width-medium);
    }
    :host([variant='center'][width='small']) .sheet {
      max-width: var(--sheet-width-small);
    }
    :host([variant='center'][width='large']) .sheet {
      max-width: var(--sheet-width-large);
    }
    :host([variant='center'][width='full']) .sheet {
      max-width: var(--sheet-width-full);
    }

    /* bottom */
    :host([variant='bottom']) .sheet {
      max-width: var(--sheet-bottom-max-width);
      border-bottom-left-radius: var(--sheet-radius);
      border-bottom-right-radius: var(--sheet-radius);
      margin-top: auto;
      transform: translateY(100%);
    }

    /* left */
    :host([variant='left']) .sheet {
      margin-right: auto;
      max-width: 50vw;
      height: 100%;
      max-height: 100vh;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      transform: translateX(-100%);
    }

    /* right */
    :host([variant='right']) .sheet {
      margin-left: auto;
      max-width: 50vw;
      height: 100%;
      max-height: 100vh;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      transform: translateX(100%);
    }

    @media ${MEDIA.small} {
      :host([variant='left']) .sheet,
      :host([variant='right']) .sheet {
        max-width: 100vw;
      }
    }

    /* anchor */
    :host([variant='anchor']) {
      position: fixed;
      inset: auto; /* base의 inset: 0 리셋 — JS가 top/left를 주입 */
      background: transparent;
      width: auto;
      height: auto;
      opacity: 1;
      visibility: visible;
      pointer-events: auto;

      & .sheet {
        width: var(--sheet-anchor-width);
        max-height: var(--sheet-anchor-max-height);
      }
    }

    /* inline */
    :host([variant='inline']) {
      position: relative;
      inset: auto; /* base의 inset: 0 리셋 */
      background: transparent;

      & .sheet {
        transform: translateY(var(--space-1-minus));
      }
    }
  `,
  sheetElementStyles,
]
