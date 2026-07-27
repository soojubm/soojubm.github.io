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
    /* TODO: chrome 그림자 복구 시 var(--surface-chrome-shadow)로 되돌린다 */
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
