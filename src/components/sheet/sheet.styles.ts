import { css } from 'lit'

import { MEDIA } from '@/stylesheets/shared/breakpoints'
import { scrollbarStyles } from '@/stylesheets/shared/scrollbar.styles'

export const sheetStyles = css`
  :host {
    --sheet-z-index: var(--material-zindex-modal);
    --sheet-backdrop-background-color: var(--color-backdrop);
    --sheet-border-radius: var(--radius-large);
    --sheet-padding-block: var(--space-3);
    --sheet-padding-inline: var(--space-4);
    --sheet-max-width: var(--layout-width-narrow);
    --sheet-viewport-max-height: 100vh;
    --sheet-backdrop-blur: 0px;

    display: flex;
    width: 100vw;
    height: 100dvh;
    justify-content: center;
    align-items: center;
    background: var(--sheet-backdrop-background-color);

    opacity: 0;
    visibility: hidden;
    pointer-events: none;

    position: fixed;
    inset: 0;
    z-index: var(--sheet-z-index);
    transition: opacity var(--transition-duration) ease,
      visibility 0s linear var(--transition-duration),
      backdrop-filter var(--transition-duration) ease;
    backdrop-filter: blur(var(--sheet-backdrop-blur));
  }

  :host([open]) {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transition: opacity var(--transition-duration) ease, visibility 0s;
  }

  .sheet {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: var(--sheet-height, auto);
    max-width: var(--sheet-max-width);
    max-height: 90vh;
    padding: 0 var(--sheet-padding-inline);
    border: var(--surface-high-border);
    border-radius: var(--sheet-border-radius);
    box-shadow: var(--surface-high-shadow);
    box-sizing: border-box;
    background: var(--background-color);
    overflow: hidden;
    position: relative;
    isolation: isolate;
    transform: scale(0.96);
    transition: transform var(--transition-duration) cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .sheet::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background: var(--surface-high-background-color);
    backdrop-filter: var(--surface-high-backdrop-filter);
    -webkit-backdrop-filter: var(--surface-high-backdrop-filter);
  }

  :host([open][variant='center']) .sheet {
    transform: scale(1);
    transition: transform var(--transition-duration-emphasis) cubic-bezier(0.18, 1.25, 0.4, 1);
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

  /* center + width */
  :host([variant='center'][width='small']) {
    --sheet-max-width: 320px;
  }
  :host([variant='center'][width='large']) {
    --sheet-max-width: var(--layout-width-wide);
  }
  :host([variant='center'][width='full']) {
    --sheet-max-width: 100%;
  }

  /* bottom */
  :host([variant='bottom']) {
    --sheet-max-width: calc(var(--layout-width-small) + var(--space-4) * 10);
  }
  :host([variant='bottom']) .sheet {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    margin-top: auto;
    transform: translateY(100%);
  }

  /* left/right */
  :host([variant='left']),
  :host([variant='right']) {
    --sheet-max-width: 50vw;
  }

  :host([variant='left']) .sheet {
    margin-right: auto;
    height: 100%;
    max-height: var(--sheet-viewport-max-height);
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    transform: translateX(-100%);
  }

  :host([variant='right']) .sheet {
    margin-left: auto;
    height: 100%;
    max-height: var(--sheet-viewport-max-height);
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    transform: translateX(100%);
  }

  @media ${MEDIA.compact} {
    :host([variant='left']),
    :host([variant='right']) {
      --sheet-max-width: 100vw;
    }
  }
`

export const sheetDragHandleStyles = css`
  /* sheet-header의 padding-block 안에 겹쳐, 아래로 끌어 닫는 제스처의 진입점 역할만 한다 */
  :host([variant='bottom']) .drag-handle {
    width: var(--size-48);
    height: var(--sheet-padding-block);
    cursor: grab;
    touch-action: none;

    position: absolute;
    top: 0;
    left: 50%;
    z-index: 2;
    transform: translateX(-50%);
  }

  :host([variant='bottom']) .drag-handle:active {
    cursor: grabbing;
  }

  :host([variant='bottom']) .drag-handle::after {
    content: '';
    width: var(--size-32);
    height: var(--space-1);
    border-radius: var(--radius-full);
    background: var(--background-strong-color);

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

export const sheetHeaderStyles = css`
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: var(--sheet-padding-block) var(--sheet-padding-inline);
    box-sizing: border-box;
  }

  /* 재질을 별도 레이어로 분리해 아래로 갈수록 사라지게 마스킹한다.
     호스트에 직접 마스크를 걸면 제목·닫기 버튼까지 함께 페이드된다.
     경계선도 이 레이어에 두어, 페이드가 있는 테마에서는 재질과 함께 사라지고
     페이드가 없는 테마에서는 그대로 남아 콘텐츠와의 경계를 유지한다. */
  header::before {
    content: '';
    border-bottom: var(--surface-high-border);
    background: var(--surface-high-background-color);
    backdrop-filter: var(--surface-high-backdrop-filter);
    position: absolute;
    inset: 0;
    z-index: -1;
  }
`

export const sheetBodyStyles = css`
  :host {
    flex: 1 1 auto;
    min-height: 0;
    padding: var(--space-4) 0;
    overflow-y: auto;
    overflow-x: hidden;

    ${scrollbarStyles};
  }
`

export const sheetFooterStyles = css`
  :host {
    display: block;
    box-sizing: border-box;
    padding: var(--sheet-padding-block) 0
      calc(var(--sheet-padding-block) + env(safe-area-inset-bottom));
  }
`
