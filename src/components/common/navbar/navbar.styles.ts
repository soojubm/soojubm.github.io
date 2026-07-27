import { css } from 'lit'

export const navbarStyles = css`
  .navbar {
    display: flex;
    align-items: center;
    width: 100%;
    height: var(--navbar-height);
    padding: var(--space-3) var(--layout-padding-inline);
    box-sizing: border-box;

    position: fixed;
    top: 0;
    z-index: calc(var(--material-zindex-chrome) + 1);
  }

  /* 재질(배경+blur)은 자손이 아닌 ::before 형제 레이어가 소유한다.
     조상에 backdrop-filter가 있으면 내부 popover 등 자손의 backdrop-filter가 무력화되기 때문. */
  .navbar::before {
    content: '';
    height: var(--navbar-height);
    border-bottom: var(--border-transparent);
    box-sizing: border-box;
    background: var(--surface-chrome-background-color);
    backdrop-filter: var(--surface-chrome-backdrop-filter);
    box-shadow: var(--surface-chrome-shadow);
    /* TODO */
    box-shadow: none;
    position: absolute;
    inset: 0;
    z-index: -1;
  }

  .navbar-logo {
    width: var(--size-32);
    height: var(--size-32);
    background: url('/src/images/soojubm.png') no-repeat center;
    background-size: cover;
    background-color: var(--background-strong-color);
    border-radius: var(--radius-full);
  }

  .navbar-backdrop {
    height: var(--navbar-height);
  }

  .navbar-user {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    margin: 0 0 0 auto;
    position: relative;
    isolation: isolate;

    background: var(--surface-base-background-color);
    backdrop-filter: var(--surface-base-backdrop-filter);
    border: var(--surface-base-border);
    border-radius: var(--control-border-radius);
    padding: var(--control-padding);
    box-shadow: var(--surface-base-shadow);
  }

  .page {
    min-height: calc(100vh - var(--navbar-height));
    padding: var(--space-6) var(--layout-padding-inline) calc(var(--space-4) * 6);
    box-sizing: border-box;
    position: relative;
  }

  .page[data-size='fluid'] {
    max-width: 100%;
    padding: 0 0 calc(var(--space-4) * 8);
  }

  .page[data-size='wide'] {
    display: flex;
    justify-content: space-between;
  }

  .page {
    padding-left: var(--sidebar-content-shift, var(--layout-padding-inline));
  }

  .site-bottom-bar {
    display: none;
  }

  @media (max-width: 480px) {
    .site-bottom-bar {
      display: block;
    }
  }
`
