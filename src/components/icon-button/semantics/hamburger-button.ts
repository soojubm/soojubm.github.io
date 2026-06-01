import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { iconButtonStyles } from '../icon-button.styles'
import { ICON_NAMES } from './icon-names'

/**
 * 사이드바/내비게이션 메뉴를 여닫는 햄버거 버튼.
 */
@customElement('mm-hamburger-button')
export class HamburgerButton extends LitElement {
  @property({ type: String, attribute: 'aria-label' })
  override ariaLabel = ''

  @property({ type: Boolean, reflect: true }) expanded = false

  static styles = [
    iconButtonStyles,
    css`
      :host {
        margin: 0 var(--space-2) 0 0;
        z-index: calc(var(--zindex-menu) + 1);
      }
    `,
  ]

  connectedCallback() {
    super.connectedCallback()
    // navbar.ts의 toggleNavbarMenu가 .js-navbar-toggle을 selector로 사용
    this.classList.add('js-navbar-toggle')
  }

  render() {
    return html`
      <button
        type="button"
        class="icon-button"
        data-variant="plain"
        aria-label=${this.ariaLabel}
        aria-haspopup="true"
        aria-expanded=${this.expanded ? 'true' : 'false'}
      >
        <mm-icon name=${ICON_NAMES.MENU_SCALE}></mm-icon>
      </button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-hamburger-button': HamburgerButton
  }
}
