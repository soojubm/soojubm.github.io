import { css } from 'lit'
import { MEDIA } from '@/constants'

/** modal 표면 뒤를 덮는 dim·blur 재질. 표시 상태는 자신을 품은 레이어가 소유한다. */
export const backdropStyles = css`
  :host {
    --backdrop-background-color: transparent;
    --backdrop-blur: 0px;

    display: block;
    background: var(--backdrop-background-color);
    position: fixed;
    inset: 0;
    backdrop-filter: blur(var(--backdrop-blur));
    -webkit-backdrop-filter: blur(var(--backdrop-blur));
  }
`

/**
 * 떠 있는 표면 패널(`.panel`)의 재질.
 * backdrop-filter는 조상에 걸리면 자손의 blur가 죽으므로 ::before 레이어에 분리해 깐다.
 * `--layer-*` 토큰은 여기서 소비만 한다. 기본값은 패널을 소유한 컴포넌트가 `:host`에 선언하며,
 * 그래야 placement·prop·상위 컴포넌트의 재할당이 상속을 타고 패널까지 내려온다.
 * 열림/닫힘은 각 컴포넌트가 자기 표면을 쥔 요소에서 소유하므로 여기서 다루지 않는다.
 */
export const overlaySurfaceStyles = css`
  .panel {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: var(--layer-min-width);
    max-width: var(--layer-max-width);
    height: var(--layer-height);
    max-height: var(--layer-max-height);
    padding: var(--layer-padding-block) var(--layer-padding-inline);

    border: var(--surface-overlay-border);
    border-radius: var(--layer-border-radius);
    box-shadow: var(--surface-overlay-shadow);
    background: var(--background-color);
    box-sizing: border-box;
    overflow: hidden;

    position: relative;
    isolation: isolate;
  }

  .panel::before {
    content: '';
    border-radius: inherit;
    background: var(--surface-overlay-background-color);
    backdrop-filter: var(--surface-overlay-backdrop-filter);
    -webkit-backdrop-filter: var(--surface-overlay-backdrop-filter);
    position: absolute;
    inset: 0;
    z-index: -1;
  }
`

/**
 * viewport 기준 modal 레이어(mm-layer, mm-dialog)의 위치.
 * 호스트가 패널을 화면 기준으로 앉히는 고정 컨테이너가 되고, placement별로 패널을 어느 변에
 * 붙일지 정한다. 표면 재질은 overlaySurfaceStyles가, 뒤를 덮는 재질은 mm-backdrop이 맡는다.
 * `--layer-*` 기본값을 함께 선언하는 이유는 재할당이 `:host`에서 일어나기 때문이다.
 */
export const layerPositionStyles = css`
  :host {
    --layer-z-index: var(--material-zindex-modal);
    --layer-min-width: auto;
    --layer-max-width: var(--layout-width-narrow);
    --layer-height: auto;
    --layer-max-height: 90vh;
    --layer-viewport-max-height: 100vh;
    --layer-padding-block: var(--space-4);
    --layer-padding-inline: var(--space-4);
    --layer-border-radius: var(--radius-large);
    --layer-backdrop-background-color: transparent;
    --layer-backdrop-blur: 0px;

    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    inset: 0;
    z-index: var(--layer-z-index);

    /* backdrop과 패널을 한 번에 띄우고 내린다. 닫힐 때만 visibility를 지연시켜
       fade-out이 끝난 뒤에 접근성 트리와 히트 테스트에서 빠지게 한다. */
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity var(--transition-duration) var(--transition-easing),
      visibility 0s linear var(--transition-duration);
  }

  :host([open]) {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transition: opacity var(--transition-duration) var(--transition-easing), visibility 0s;
  }

  /* backdrop 재질은 mm-backdrop이 소유하고, layer는 자기 공개 knob을 그쪽으로 잇는다. */
  mm-backdrop {
    --backdrop-background-color: var(--layer-backdrop-background-color);
    --backdrop-blur: var(--layer-backdrop-blur);
  }

  .panel {
    transform: scale(0.96);
    transition: transform var(--transition-duration) var(--transition-easing);
  }

  :host([open]) .panel {
    transform: scale(1);
    transition: transform var(--transition-duration) var(--transition-easing-emphasis);
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
  :host([placement='bottom']) .panel {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    margin-top: auto;
    transform: translateY(100%);
  }
  :host([open][placement='bottom']) .panel {
    transform: translateY(0);
  }

  /* left/right */
  :host([placement='left']),
  :host([placement='right']) {
    --layer-max-width: 640px;
  }

  :host([placement='left']) .panel {
    margin-right: auto;
    height: 100%;
    max-height: var(--layer-viewport-max-height);
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    transform: translateX(-100%);
  }
  :host([open][placement='left']) .panel {
    transform: translateX(0);
  }

  :host([placement='right']) .panel {
    margin-left: auto;
    height: 100%;
    max-height: var(--layer-viewport-max-height);
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    transform: translateX(100%);
  }
  :host([open][placement='right']) .panel {
    transform: translateX(0);
  }
`

/**
 * 트리거에 앵커되는 non-modal 레이어(mm-popover)의 위치.
 * 호스트가 스스로 positioned 앵커가 되고, placement별로 패널을 트리거의 어느 모서리에 붙일지 정한다.
 * 표면 재질은 overlaySurfaceStyles가 맡는다.
 * `--layer-*` 기본값을 함께 선언하는 이유는 재할당이 `:host`에서 일어나기 때문이다.
 */
export const popoverPositionStyles = css`
  :host {
    /* 트리거가 아이콘 버튼처럼 좁아도 패널이 그 폭으로 눌리지 않게 하는 바닥값 */
    --layer-min-width: 240px;
    --layer-max-width: auto;
    --layer-height: auto;
    --layer-max-height: none;
    --layer-padding-block: var(--space-2);
    --layer-padding-inline: var(--space-4);
    --layer-border-radius: var(--radius);
    --popover-offset: var(--space-1);

    /* 슬롯된 트리거를 감싸 popover 스스로 앵커(positioned wrapper)가 된다. */
    display: flex;
    position: relative;
  }

  .panel {
    /* 트리거에 붙은 모서리에서 자라나도록, placement가 원점을 축별로 뒤집는다 */
    --popover-origin-block: top;
    --popover-origin-inline: left;

    position: absolute;
    top: calc(100% + var(--popover-offset));
    left: 0;
    right: 0;
    z-index: var(--material-zindex-overlay);

    /* 호스트는 트리거를 감싸므로 늘 보인다. 뜨고 지는 것은 패널만의 상태다. */
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transform: scale(0.96);
    transform-origin: var(--popover-origin-block) var(--popover-origin-inline);
    transition: opacity var(--transition-duration) var(--transition-easing),
      transform var(--transition-duration) var(--transition-easing),
      visibility 0s linear var(--transition-duration);
  }

  .panel mm-scroll {
    flex: 1 1 auto;
    min-height: 0;
  }

  :host([open]) .panel {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: scale(1);
    transition: opacity var(--transition-duration) var(--transition-easing),
      transform var(--transition-duration) var(--transition-easing-emphasis), visibility 0s;
  }

  :host([placement='bottom-right']) .panel,
  :host([placement='top-right']) .panel {
    --popover-origin-inline: right;

    left: auto;
    right: 0;
  }

  :host([placement='top-left']) .panel,
  :host([placement='top-right']) .panel {
    --popover-origin-block: bottom;

    top: auto;
    bottom: calc(100% + var(--popover-offset));
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
    z-index: var(--material-zindex-raised);
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
  :host {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    box-sizing: border-box;
    position: relative;
  }

  :host::before {
    content: '';
    background: var(--surface-overlay-background-color);
    backdrop-filter: var(--surface-overlay-backdrop-filter);
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
    padding: var(--layer-padding-block) 0;
  }

  mm-scroll {
    width: 100%;
  }
`

export const layerFooterStyles = css`
  :host {
    display: block;
    box-sizing: border-box;
    padding: var(--layer-padding-block) 0 calc(0 + env(safe-area-inset-bottom));
  }
`

export const toastStyles = css`
  :host {
    --toast-background-color: var(--background-strong-color);
    --toast-text-color: var(--foreground-color-on-solid);
    --toast-border-radius: var(--radius-large);
    --toast-padding-block: var(--space-2);
    --toast-padding-inline: var(--space-4);
    --toast-offset: var(--space-4);

    display: flex;
    min-width: 25vw;
    align-items: center;
    min-height: var(--size-48);
    gap: var(--space-2);
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

export const tooltipStyles = css`
  :host {
    display: inline-flex;
    position: relative;

    --tooltip-max-width: 320px;
    --tooltip-padding: 0.5rem var(--space-3);
    --tooltip-border-radius: var(--radius);
    --tooltip-background-color: var(--background-strong-color);
    --tooltip-text-color: var(--foreground-color-on-solid);
    --tooltip-shadow: var(--surface-base-shadow);
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
    transition: opacity var(--transition-duration) var(--transition-easing),
      visibility var(--transition-duration) var(--transition-easing);

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
