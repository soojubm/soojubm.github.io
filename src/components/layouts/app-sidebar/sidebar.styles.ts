import { css } from 'lit'

import { backgroundLayerStyles } from '@/stylesheets/shared.styles'

export const sidebarStyles = css`
  :host {
    display: block;
  }

  /* 페이지 목록은 가운데 영역에서 스크롤하고, 사용자 영역은 바닥에 고정된다 */
  nav {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: var(--layout-width-sidebar);
    gap: var(--space-4);
    /* margin-top으로 하면 brutal theme border가 연결되지 않음 */
    padding: var(--layout-sidebar-space-top) var(--space-3)
      calc(var(--space-4) + env(safe-area-inset-bottom)) calc(var(--layout-padding-inline));
    border-right: var(--border-transparent);
    transition: transform var(--transition-duration) var(--transition-easing);
    transform: translateX(-120%);
    position: fixed;
    top: var(--navbar-height);
    bottom: 0;
    z-index: var(--material-zindex-chrome-top);
  }

  /* 재질은 ::before 레이어가 소유한다. nav에 backdrop-filter를 두면 사용자 메뉴 popover의 blur가 죽는다 */
  nav::before {
    background: var(--material-chrome-background-color);
    backdrop-filter: var(--material-chrome-backdrop-filter);
    -webkit-backdrop-filter: var(--material-chrome-backdrop-filter);
    ${backgroundLayerStyles};
  }

  mm-scroll {
    flex: 1;
    min-height: 0;
    /* 메뉴 hover 면이 스크롤바에 붙지 않게 띄운다 */
    padding-inline-end: var(--space-2);
  }

  :host([open]) nav {
    transform: translateX(0);
  }

  :host([open]) mm-scroll {
    overscroll-behavior: contain;
  }

  .group {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }
`
