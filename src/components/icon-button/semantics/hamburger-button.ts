import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ICON_NAMES } from './icon-names'
import type { AriaBoolean, AriaIdRef } from '../../../types/aria'
import '../icon-button'

/**
 * 사이드바/내비게이션 메뉴를 여닫는 햄버거 버튼.
 */
@customElement('mm-hamburger-button')
export class HamburgerButton extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      z-index: calc(var(--zindex-menu) + 1);
    }
  `

  @property({ type: String, attribute: 'aria-label' }) ariaLabel = '전체 메뉴'
  @property({ type: String, attribute: 'aria-expanded' }) ariaExpanded: AriaBoolean = 'false'
  @property({ type: String, attribute: 'aria-controls' }) ariaControls: AriaIdRef = null

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
        aria-label=${this.ariaLabel}
        aria-expanded=${this.ariaExpanded}
        aria-controls=${this.ariaControls ?? nothing}
      ></mm-icon-button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-hamburger-button': HamburgerButton
  }
}
