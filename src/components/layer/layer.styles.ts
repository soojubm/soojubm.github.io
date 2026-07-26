import { css } from 'lit'

import { MEDIA } from '@/stylesheets/shared/breakpoints'

/**
 * viewport 기준 modal 레이어(mm-layer, mm-dialog)가 공유하는 배경·패널 골격.
 * 호스트 자신이 고정 backdrop이 되고, 내부의 `.layer` 요소가 실제 표면 패널이다.
 * placement별 위치·전환(translate 등)과 크기 prop은 이를 소비하는 컴포넌트가 각자 정의한다.
 */
export const layerStyles = css`
  :host {
    --layer-z-index: var(--material-zindex-modal);
    --layer-backdrop-background-color: var(--color-backdrop);
    --layer-backdrop-blur: 0px;
    --layer-border-radius: var(--radius-large);
    --layer-padding-inline: var(--space-4);
    --layer-padding-block: var(--space-3);
    --layer-max-width: var(--layout-width-narrow);

    display: flex;
    width: 100vw;
    height: 100dvh;
    justify-content: center;
    align-items: center;
    background: var(--layer-backdrop-background-color);

    opacity: 0;
    visibility: hidden;
    pointer-events: none;

    position: fixed;
    inset: 0;
    z-index: var(--layer-z-index);
    transition: opacity var(--transition-duration) ease,
      visibility 0s linear var(--transition-duration),
      backdrop-filter var(--transition-duration) ease;
    backdrop-filter: blur(var(--layer-backdrop-blur));
  }

  :host([open]) {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transition: opacity var(--transition-duration) ease, visibility 0s;
  }

  .layer {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: var(--layer-max-width);
    max-height: 90vh;
    padding: 0 var(--layer-padding-inline);
    border: var(--surface-high-border);
    border-radius: var(--layer-border-radius);
    box-shadow: var(--surface-high-shadow);
    box-sizing: border-box;
    background: var(--background-color);
    overflow: hidden;
    position: relative;
    isolation: isolate;
    transform: scale(0.96);
    transition: transform var(--transition-duration) cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .layer::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background: var(--surface-high-background-color);
    backdrop-filter: var(--surface-high-backdrop-filter);
    -webkit-backdrop-filter: var(--surface-high-backdrop-filter);
  }

  :host([open]) .layer {
    transform: scale(1);
    transition: transform var(--transition-duration-emphasis) cubic-bezier(0.18, 1.25, 0.4, 1);
  }
`

/** mm-layer 전용: placement(center/bottom/left/right)별 크기·전환. */
export const layerPlacementStyles = css`
  :host {
    --layer-viewport-max-height: 100vh;
    /* height prop이 인라인 스타일로 재정의한다 */
    --layer-height: auto;
  }

  .layer {
    height: var(--layer-height);
  }

  /* center + width */
  :host([placement='center'][width='small']) {
    --layer-max-width: 320px;
  }
  :host([placement='center'][width='large']) {
    --layer-max-width: var(--layout-width-wide);
  }
  :host([placement='center'][width='full']) {
    --layer-max-width: 100%;
  }

  /* bottom */
  :host([placement='bottom']) {
    --layer-max-width: calc(var(--layout-width-small) + var(--space-4) * 10);
  }
  :host([placement='bottom']) .layer {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    margin-top: auto;
    transform: translateY(100%);
  }
  :host([open][placement='bottom']) .layer {
    transform: translateY(0);
  }

  /* left/right */
  :host([placement='left']),
  :host([placement='right']) {
    --layer-max-width: 50vw;
  }

  :host([placement='left']) .layer {
    margin-right: auto;
    height: 100%;
    max-height: var(--layer-viewport-max-height);
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    transform: translateX(-100%);
  }
  :host([open][placement='left']) .layer {
    transform: translateX(0);
  }

  :host([placement='right']) .layer {
    margin-left: auto;
    height: 100%;
    max-height: var(--layer-viewport-max-height);
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    transform: translateX(100%);
  }
  :host([open][placement='right']) .layer {
    transform: translateX(0);
  }

  @media ${MEDIA.compact} {
    :host([placement='left']),
    :host([placement='right']) {
      --layer-max-width: 100vw;
    }
  }
`

export const layerDragHandleStyles = css`
  /* layer-header의 padding-block 안에 겹쳐, 아래로 끌어 닫는 제스처의 진입점 역할만 한다 */
  :host([placement='bottom']) .drag-handle {
    width: var(--size-48);
    height: 4px;
    cursor: grab;
    touch-action: none;

    position: absolute;
    top: 0;
    left: 50%;
    z-index: 2;
    transform: translateX(-50%);
  }

  :host([placement='bottom']) .drag-handle:active {
    cursor: grabbing;
  }

  :host([placement='bottom']) .drag-handle::after {
    content: '';
    width: var(--size-32);
    height: var(--space-1);
    border-radius: var(--radius);
    background: var(--background-subtle-color);

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

export const layerHeaderStyles = css`
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: var(--layer-padding-block) 0;
    box-sizing: border-box;
    position: relative;
  }
  header::before {
    content: '';
    background: var(--surface-high-background-color);
    backdrop-filter: var(--surface-high-backdrop-filter);
    position: absolute;
    inset: 0;
    z-index: -1;
  }
`

export const layerBodyStyles = css`
  :host {
    display: flex;
    flex: 1 1 auto;
    min-height: 0;
  }

  mm-scroll {
    width: 100%;
  }
`

export const layerFooterStyles = css`
  :host {
    display: block;
    box-sizing: border-box;
    padding: var(--layer-padding-block) 0
      calc(var(--layer-padding-block) + env(safe-area-inset-bottom));
  }
`
