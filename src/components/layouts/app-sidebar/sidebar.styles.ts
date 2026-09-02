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
    /* margin-top으로 하면 brutal theme border가 연결되지 않음 */
    padding: var(--layout-content-space-top) var(--space-3)
      calc(var(--space-4) + env(safe-area-inset-bottom)) calc(var(--layout-padding-inline));
    background: var(--surface-chrome-background-color);
    border-right: var(--border-transparent);
    backdrop-filter: var(--surface-chrome-backdrop-filter);
    -webkit-backdrop-filter: var(--surface-chrome-backdrop-filter);
    overflow-y: auto;
    transition: transform var(--transition-duration) var(--transition-easing);
    transform: translateX(-120%);
    position: fixed;
    top: var(--navbar-height);
    bottom: 0;
    z-index: calc(var(--material-zindex-chrome) + 1);

    ${scrollbarStyles};
  }

  :host([open]) nav {
    transform: translateX(0);
    overscroll-behavior: contain;
  }
`
