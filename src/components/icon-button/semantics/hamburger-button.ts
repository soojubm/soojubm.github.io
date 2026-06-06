import { css } from 'lit'
import { customElement } from 'lit/decorators.js'
import IconButton from '../icon-button'
import { PopupTriggerMixin } from '../popup-trigger.mixin'
import { ICON_NAMES } from './icon-names'

/**
 * 사이드바/내비게이션 메뉴를 여닫는 햄버거 버튼.
 */
@customElement('mm-hamburger-button')
export class HamburgerButton extends PopupTriggerMixin(IconButton) {
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
    this.icon = ICON_NAMES.MENU
    this.variant = 'plain'
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
