import { css } from 'lit'

import { scrollbarStyles } from '@/stylesheets/shared.styles'

export const sidebarStyles = css`
  :host {
    display: block;
  }

  nav {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: var(--layout-width-sidebar);
    gap: var(--space-2);
    padding: var(--space-6) var(--space-3) calc(var(--space-4) + env(safe-area-inset-bottom))
      calc(var(--layout-padding-inline));
    background: var(--surface-chrome-background-color);
    border-right: var(--border-transparent);
    box-shadow: var(--surface-chrome-shadow);
    /* TODO */
    box-shadow: none;
    backdrop-filter: var(--surface-chrome-backdrop-filter);
    -webkit-backdrop-filter: var(--surface-chrome-backdrop-filter);
    scrollbar-gutter: stable;
    transition: transform var(--duration-slowly) cubic-bezier(0.165, 0.84, 0.44, 1);
    transform: translateX(-120%);
    position: fixed;
    top: var(--navbar-height);
    bottom: 0;
    overflow-y: auto;
    z-index: calc(var(--material-zindex-chrome) + 1);

    ${scrollbarStyles};
  }

  :host([open]) nav {
    transform: translateX(0);
    overscroll-behavior: contain;
  }

  mm-menu-item-link:hover,
  mm-menu-item-link[aria-current='page'] {
    border-color: var(--color-primary);
  }
`

/**
 * 사이드바가 열렸을 때 콘텐츠(.page)와 mm-footer가 밀려나는 폭은
 * body에 노출하는 이 전역 변수로만 전달한다.
 */
export const sidebarContentShiftStyles = css`
  body:has(mm-sidebar[open]) {
    --sidebar-content-shift: calc(
      var(--layout-width-sidebar) + var(--layout-padding-inline) + var(--layout-padding-inline) +
        var(--space-4)
    );
  }

  @media (max-width: 1200px) {
    body:has(mm-sidebar[open]) {
      --sidebar-content-shift: var(--layout-padding-inline);
    }
  }
`
