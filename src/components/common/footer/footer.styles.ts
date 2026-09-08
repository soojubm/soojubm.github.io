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
    transition: padding-left var(--transition-duration) var(--transition-easing);
  }

  .footer address mm-paragraph {
    margin: var(--space-4) 0;
  }

  .footer-links {
    display: flex;
    flex-direction: column;
    max-width: 320px;
    margin: var(--space-4) 0;
  }

  .footer-address-break {
    width: 100%;
  }

  .footer-address-info {
    display: flex;
    flex-wrap: wrap;
    column-gap: var(--space-2);
  }

  dd {
    margin: 0;
  }

  .footer-address-info dt {
    color: var(--foreground-subtle-color);
  }
`
