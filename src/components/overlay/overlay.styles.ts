import { css } from 'lit'

import { backgroundLayerStyles, layerContainerStyles } from '@/stylesheets/shared.styles'

/**
 * modal 표면 뒤를 덮는 dim·blur 재질. 표시 상태는 자신을 품은 레이어가 소유한다.
 * `--backdrop-*` 기본값도 자신이 아니라 자신을 품은 표면이 선언한다.
 * 여기서 선언하면 그 표면이 흘려보내는 값이 이 `:host`에 가려 닿지 못하기 때문이다.
 */
export const backdropStyles = css`
  :host {
    display: block;
    background: var(--backdrop-background-color);
    position: fixed;
    inset: 0;
    z-index: var(--material-zindex-backdrop);
    backdrop-filter: blur(var(--backdrop-blur));
    -webkit-backdrop-filter: blur(var(--backdrop-blur));
  }
`

/**
 * 떠 있는 표면 패널(`.panel`)의 재질.
 * backdrop-filter는 조상에 걸리면 자손의 blur가 죽으므로 ::before 레이어에 분리해 깐다.
 * `--overlay-panel-*` 토큰은 여기서 소비만 한다. 기본값은 패널을 소유한 컴포넌트가 `:host`에 선언하며,
 * 그래야 placement·prop·상위 컴포넌트의 재할당이 상속을 타고 패널까지 내려온다.
 * 열림/닫힘은 각 컴포넌트가 자기 표면을 쥔 요소에서 소유하므로 여기서 다루지 않는다.
 */
export const overlaySurfaceStyles = css`
  .panel {
    display: flex;
    flex-direction: column;
    min-width: var(--overlay-panel-min-width);
    max-width: var(--overlay-panel-max-width);
    height: var(--overlay-panel-height);
    max-height: var(--overlay-panel-max-height);
    gap: var(--overlay-panel-padding-block);
    padding: var(--overlay-panel-padding-block) var(--overlay-panel-padding-inline);

    border: var(--material-overlay-border);
    border-radius: var(--overlay-panel-border-radius);
    box-shadow: var(--material-overlay-shadow);
    background: var(--background-color);
    box-sizing: border-box;
    overflow: hidden;

    ${layerContainerStyles}; /* ::before 레이어와 드래그 핸들의 기준 박스. popover는 absolute로 덮어쓴다 */
  }

  .panel::before {
    border-radius: inherit;
    background: var(--material-overlay-background-color);
    backdrop-filter: var(--material-overlay-backdrop-filter);
    -webkit-backdrop-filter: var(--material-overlay-backdrop-filter);
    ${backgroundLayerStyles};
  }
`

/**
 * viewport 기준 modal 표면(mm-sheet, mm-dialog)의 위치.
 * 호스트가 패널을 화면 기준으로 앉히는 고정 컨테이너가 되고, placement별로 패널을 어느 변에
 * 붙일지 정한다. placement가 없는 표면(mm-dialog)은 화면 가운데에 앉는다. 표면 재질은 overlaySurfaceStyles가, 뒤를 덮는 재질은 mm-backdrop이 맡는다.
 * `--overlay-panel-*`와 backdrop 토큰의 기본값을 함께 선언하는 이유는 재할당이 `:host`에서 일어나기 때문이다.
 */
export const sheetPositionStyles = css`
  :host {
    --overlay-panel-z-index: var(--material-zindex-sheet);
    --overlay-panel-min-width: auto;
    --overlay-panel-max-width: var(--layout-width-small);
    --overlay-panel-height: auto;
    --overlay-panel-max-height: 90vh;
    --overlay-panel-viewport-max-height: 100vh;
    --overlay-panel-padding-block: var(--space-4);
    --overlay-panel-padding-inline: var(--space-4);
    --overlay-panel-border-radius: var(--radius-large);
    --backdrop-background-color: transparent;
    --backdrop-blur: 0px;

    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    inset: 0;
    z-index: var(--overlay-panel-z-index);

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

  /* 열릴 때 포커스를 받는 표면 자체는 화면 전체를 덮으므로 포커스 링을 그리지 않는다 */
  :host(:focus) {
    outline: none;
  }

  .panel {
    /* 패널이 콘텐츠 폭으로 줄지 않고 max-width를 채운다 */
    width: 100%;

    /* backdrop이 자기 층위를 명시하므로, 같은 stacking context 안의 패널도 층위를 밝혀야 덮이지 않는다 */
    z-index: var(--material-zindex-sheet);
  }

  /* full-width는 placement와 상관없이 폭 제한을 푼다 */
  :host([full-width]) {
    --overlay-panel-max-width: 100%;
  }

  /* 화면 아래 변에 닿는 배치는 footer 유무와 상관없이 홈 인디케이터 영역만큼 여백을 더 둔다 */
  :host([placement='bottom']) .panel,
  :host([placement='left']) .panel,
  :host([placement='right']) .panel {
    padding-bottom: calc(var(--overlay-panel-padding-block) + env(safe-area-inset-bottom));
  }

  /* top */
  :host([placement='top']) .panel {
    margin-bottom: auto;
    padding-top: calc(var(--overlay-panel-padding-block) + env(safe-area-inset-top));
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    transform: translateY(-100%);
  }

  /* bottom */
  :host([placement='bottom']) .panel {
    margin-top: auto;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    transform: translateY(100%);
  }

  /* left/right */
  :host([placement='left']) .panel {
    height: 100%;
    max-height: var(--overlay-panel-viewport-max-height);
    margin-right: auto;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    transform: translateX(-100%);
  }

  :host([placement='right']) .panel {
    height: 100%;
    max-height: var(--overlay-panel-viewport-max-height);
    margin-left: auto;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    transform: translateX(100%);
  }

  /* 닫힘 상태의 placement 규칙과 선택자 무게가 같으므로, open을 함께 걸어 열림 규칙이 이기게 한다 */
  :host([open][placement]) .panel {
    transform: none;
    transition: transform var(--transition-duration) var(--transition-easing-emphasis);
  }
`

/**
 * 트리거에 앵커되는 non-modal 레이어(mm-popover)의 위치.
 * 호스트가 스스로 positioned 앵커가 되고, placement별로 패널을 트리거의 어느 모서리에 붙일지 정한다.
 * 표면 재질은 overlaySurfaceStyles가 맡는다.
 * `--overlay-panel-*` 기본값을 함께 선언하는 이유는 재할당이 `:host`에서 일어나기 때문이다.
 */
export const popoverPositionStyles = css`
  :host {
    /* 트리거가 아이콘 버튼처럼 좁아도 패널이 그 폭으로 눌리지 않게 하는 바닥값 */
    --overlay-panel-min-width: 240px;
    --overlay-panel-max-width: none;
    --overlay-panel-height: auto;
    /* 길어진 목록은 패널을 키우지 않고 안의 mm-scroll이 스크롤한다 */
    --overlay-panel-max-height: min(400px, 50vh);
    --overlay-panel-padding-block: var(--space-2);
    --overlay-panel-padding-inline: var(--space-2);
    --overlay-panel-border-radius: var(--radius);
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
    z-index: var(--material-zindex-popover);

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

export const sheetDragHandleStyles = css`
  /* sheet-header의 padding-block 안에 겹쳐, 아래로 끌어 닫는 제스처의 진입점 역할만 한다 */
  .drag-handle {
    width: var(--size-48);
    height: 4px;
    cursor: grab;
    touch-action: none;

    position: absolute;
    top: 0;
    left: 50%;
    z-index: var(--material-zindex-elevated);
    transform: translateX(-50%);
  }

  .drag-handle:active {
    cursor: grabbing;
  }

  .drag-handle::after {
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

export const sheetHeaderStyles = css`
  :host {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    box-sizing: border-box;
  }
`

export const sheetBodyStyles = css`
  :host {
    display: flex;
    flex: 1 1 auto;
    min-height: 0;
  }

  mm-scroll {
    width: 100%;
  }
`

export const sheetFooterStyles = css`
  :host {
    display: block;
  }
`

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

export const tooltipStyles = css`
  :host {
    display: inline-flex;
    position: relative;

    --tooltip-max-width: 280px;
    --tooltip-padding: 0.5rem var(--space-3);
    --tooltip-border-radius: var(--radius);
    --tooltip-background-color: var(--background-strong-color);
    --tooltip-text-color: var(--background-color);
    --tooltip-shadow: var(--material-base-shadow);
  }

  :host([open]) [role='tooltip'] {
    display: block;
    opacity: 1;

    @starting-style {
      opacity: 0;
    }
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
    /* 트리거보다 넓은 말풍선이 스크롤 컨테이너 안에서 스크롤 영역을 넓히지 않도록
       닫힐 때 레이아웃에서 빼고, display를 이산 전환해 fade-out은 남긴다. */
    display: none;
    opacity: 0;
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
    z-index: var(--material-zindex-popover);
    pointer-events: none;
    transition: opacity var(--transition-duration) var(--transition-easing),
      display var(--transition-duration) var(--transition-easing) allow-discrete;

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
