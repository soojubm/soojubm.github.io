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
    gap: var(--space-4);
    /* margin-top으로 하면 brutal theme border가 연결되지 않음 */
    padding: var(--layout-sidebar-space-top) var(--space-3)
      calc(var(--space-4) + env(safe-area-inset-bottom)) calc(var(--layout-padding-inline));
    background: var(--material-chrome-background-color);
    border-right: var(--border-transparent);
    backdrop-filter: var(--material-chrome-backdrop-filter);
    -webkit-backdrop-filter: var(--material-chrome-backdrop-filter);
    overflow-y: auto;
    transition: transform var(--transition-duration) var(--transition-easing);
    transform: translateX(-120%);
    position: fixed;
    top: var(--navbar-height);
    bottom: 0;
    z-index: var(--material-zindex-chrome-top);

    ${scrollbarStyles};
  }

  :host([open]) nav {
    transform: translateX(0);
    overscroll-behavior: contain;
  }

  .list {
    display: flex;
    flex-direction: column;
  }

  .group {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  mm-heading {
    color: var(--foreground-subtle-color);
  }
`
