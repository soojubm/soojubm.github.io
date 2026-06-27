import { css } from 'lit'

export const footerStyles = css`
  :host {
    display: block;
  }

  .footer {
    padding: 2rem var(--layout-padding-inline);
    margin: 0 auto;
    position: relative;
  }

  :host-context(.is-menu-opened) .footer {
    padding-left: calc(
      var(--layout-width-sidebar) + var(--layout-padding-inline) + var(--layout-padding-inline) +
        var(--space-4)
    );
  }

  .footer address mm-paragraph {
    margin: var(--space-4) 0;
    font-size: var(--font-size-18);
    letter-spacing: 0.5px;
  }

  .footer-social-links {
    max-width: var(--width-small);
    margin: var(--space-3) 0 var(--space-5);
  }

  .footer-hidden-links {
    display: none;
    margin: var(--space-4) 0 0;
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
    color: var(--color-foreground-light);
  }

  .footer-copyright {
    display: block;
    margin: var(--space-3) 0 0;
  }

  .footer-to-top {
    margin: var(--space-5) 0 0;
  }

  @media (max-width: 1100px) {
    :host-context(.is-menu-opened) .footer {
      padding-left: var(--layout-padding-inline);
      transform: translateX(0);
    }
  }
`
