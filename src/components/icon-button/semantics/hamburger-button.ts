import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ICON_NAMES } from './icon-names'
import '../icon-button'

/**
 * 사이드바/내비게이션 메뉴를 여닫는 햄버거 버튼.
 */
@customElement('mm-hamburger-button')
export class HamburgerButton extends LitElement {
  @property({ type: String, attribute: 'aria-label' }) override ariaLabel = '전체 메뉴'
  @property({ type: String, attribute: 'aria-expanded', reflect: true }) override ariaExpanded =
    'false'
  @property({ type: String, attribute: 'aria-controls' }) override ariaControls: string | null =
    null

  static styles = css`
    :host {
      display: inline-flex;
      z-index: calc(var(--zindex-menu) + 1);
    }
  `

  connectedCallback() {
    super.connectedCallback()
    // navbar.ts의 toggleNavbarMenu가 .js-navbar-toggle을 selector로 사용
    this.classList.add('js-navbar-toggle')
  }

  render() {
    return html`
      <mm-icon-button
        icon=${ICON_NAMES.MENU}
        variant="ghost"
        .ariaLabel=${this.ariaLabel}
        .ariaExpanded=${this.ariaExpanded}
        .ariaControls=${this.ariaControls}
      ></mm-icon-button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-hamburger-button': HamburgerButton
  }
}
