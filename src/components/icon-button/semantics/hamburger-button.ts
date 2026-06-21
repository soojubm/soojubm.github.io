import { LitElement, css, html, type PropertyValues } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ICON_NAMES } from './icon-names'
import '../icon-button'

/**
 * 사이드바/내비게이션 메뉴를 여닫는 햄버거 버튼.
 */
@customElement('mm-hamburger-button')
export class HamburgerButton extends LitElement {
  @property({ type: Boolean, reflect: true }) expanded = false

  static styles = css`
    :host {
      display: contents;
      z-index: calc(var(--zindex-menu) + 1);
    }
  `

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('aria-haspopup', 'true')
    this.setAttribute('aria-expanded', String(this.expanded))
    // navbar.ts의 toggleNavbarMenu가 .js-navbar-toggle을 selector로 사용
    this.classList.add('js-navbar-toggle')
  }

  protected updated(changed: PropertyValues<this>) {
    super.updated(changed)
    if (changed.has('expanded')) {
      this.setAttribute('aria-expanded', String(this.expanded))
    }
  }

  render() {
    return html`
      <mm-icon-button
        icon=${ICON_NAMES.MENU}
        variant="ghost"
        aria-expanded=${this.expanded ? 'true' : 'false'}
      ></mm-icon-button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-hamburger-button': HamburgerButton
  }
}
