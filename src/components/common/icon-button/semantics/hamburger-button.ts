import { LitElement, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { AriaBoolean, AriaIdRef } from '@/types'

import { ICON_NAMES } from '@/components/common/icon/icon-names'
import { iconButtonStyles } from '@/components/common/icon-button/icon-button.styles'
import { renderIconAction } from '@/components/common/icon-button/icon-button.utils'

/**
 * 사이드바/내비게이션 메뉴를 여닫는 햄버거 버튼.
 */
@customElement('mm-hamburger-button')
export class HamburgerButton extends LitElement {
  static styles = [
    iconButtonStyles,
    css`
      :host {
        --icon-button-background-color: transparent;
      }
    `,
  ]

  @property({ type: String, attribute: 'aria-label' }) ariaLabel = '전체 메뉴'
  @property({ type: String, attribute: 'aria-expanded' }) ariaExpanded: AriaBoolean = 'false'
  @property({ type: String, attribute: 'aria-controls' }) ariaControls: AriaIdRef = null

  render() {
    return renderIconAction({
      icon: ICON_NAMES.MENU,
      ariaLabel: this.ariaLabel,
      ariaExpanded: this.ariaExpanded,
      ariaControls: this.ariaControls,
    })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-hamburger-button': HamburgerButton
  }
}
