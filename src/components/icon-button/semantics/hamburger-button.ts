import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { AriaBoolean, AriaIdRef } from '@/types/aria'

import '@/components/icon-button/icon-button'
import { iconButtonActionStyles } from '@/components/icon-button/icon-button.styles'
import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'

/**
 * 사이드바/내비게이션 메뉴를 여닫는 햄버거 버튼.
 */
@customElement('mm-hamburger-button')
export class HamburgerButton extends LitElement {
  static styles = [
    iconButtonActionStyles,
    css`
      :host {
        z-index: calc(var(--material-zindex-raised) + 1);
      }
    `,
  ]

  @property({ type: String, attribute: 'aria-label' }) ariaLabel = '전체 메뉴'
  @property({ type: String, attribute: 'aria-expanded' }) ariaExpanded: AriaBoolean = 'false'
  @property({ type: String, attribute: 'aria-controls' }) ariaControls: AriaIdRef = null

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
