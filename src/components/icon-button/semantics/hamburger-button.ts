import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import '../icon-button'
import { ICON_NAMES } from './icon-names'

/**
 * 사이드바/내비게이션 메뉴를 여닫는 햄버거 버튼.
 */
@customElement('mm-hamburger-button')
export class HamburgerButton extends LitElement {
  @property({ type: Boolean, reflect: true }) expanded = false

  static styles = css`
    :host {
      display: inline-flex;
      z-index: calc(var(--zindex-menu) + 1);
    }
  `

  override connectedCallback() {
    super.connectedCallback()
    // navbar.ts의 toggleNavbarMenu가 .js-navbar-toggle을 selector로 사용
    this.classList.add('js-navbar-toggle')
  }

  render() {
    return html`
      <mm-icon-button
        variant="plain"
        icon="${ICON_NAMES.MENU_SCALE}"
        aria-label="메뉴"
        aria-haspopup="true"
        aria-expanded="${this.expanded ? 'true' : 'false'}"
      ></mm-icon-button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-hamburger-button': HamburgerButton
  }
}
