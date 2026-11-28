import { css } from 'lit'

export const footerStyles = css`
  :host {
    display: block;
  }

  .footer {
    padding: 2rem var(--layout-padding-inline);
    padding-left: var(--sidebar-content-shift);
    margin: 0 auto;
    position: relative;
    transition: padding-left var(--sidebar-transition-duration) var(--sidebar-transition-easing);
  }

  .footer address fff-paragraph {
    margin: var(--space-4) 0;
  }

  .footer-links {
    display: flex;
    flex-direction: column;
    max-width: calc(var(--size-80) * 3.5);
    margin: var(--space-4) 0;
    box-sizing: border-box;
  }

  .footer-address-break {
    width: 100%;
  }

  .footer-address-info {
    display: flex;
    flex-wrap: wrap;
    column-gap: var(--space-2);
  }

  .footer-address-info dt {
    color: var(--foreground-subtle-color);
  }
`
