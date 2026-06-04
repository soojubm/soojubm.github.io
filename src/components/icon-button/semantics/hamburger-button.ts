import { css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import IconButton from '../icon-button'
import { ICON_NAMES } from './icon-names'

/**
 * 사이드바/내비게이션 메뉴를 여닫는 햄버거 버튼.
 */
@customElement('mm-hamburger-button')
export class HamburgerButton extends IconButton {
  @property({ type: Boolean, reflect: true }) expanded = false

  static override styles = [
    ...IconButton.styles,
    css`
      :host {
        z-index: calc(var(--zindex-menu) + 1);
      }
    `,
  ]

  constructor() {
    super()
    this.icon = ICON_NAMES.MENU_SCALE
    this.variant = 'plain'
  }

  protected override renderControl() {
    return html`
      <button
        slot="trigger"
        type="button"
        aria-label="${this._accessibilityLabel}"
        ?disabled="${this.disabled}"
        aria-haspopup="true"
        aria-expanded="${this.expanded ? 'true' : 'false'}"
      >
        <mm-icon name="${this.icon}"></mm-icon>
      </button>
    `
  }

  override connectedCallback() {
    super.connectedCallback()
    // navbar.ts의 toggleNavbarMenu가 .js-navbar-toggle을 selector로 사용
    this.classList.add('js-navbar-toggle')
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-hamburger-button': HamburgerButton
  }
}
