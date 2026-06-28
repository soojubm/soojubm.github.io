import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { AriaBoolean, AriaIdRef } from '@/types/aria'

import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'
import '@/components/icon-button/icon-button'

/**
 * 추가 액션 메뉴를 여는 버튼.
 */
@customElement('mm-more-button')
export class MoreButton extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
    }
  `

  @property({ type: String, attribute: 'aria-label' }) ariaLabel = '더보기'
  @property({ type: String, attribute: 'aria-expanded' }) ariaExpanded: AriaBoolean = 'false'
  @property({ type: String, attribute: 'aria-controls' }) ariaControls: AriaIdRef = null
  @property({ type: Boolean }) disabled = false

  render() {
    return html`
      <mm-icon-button
        variant="secondary"
        icon=${ICON_NAMES.MORE_ACTIONS}
        tooltip="더보기"
        tooltip-placement="center"
        aria-label=${this.ariaLabel}
        aria-haspopup="menu"
        aria-expanded=${this.ariaExpanded}
        aria-controls=${this.ariaControls ?? nothing}
        ?disabled=${this.disabled}
      ></mm-icon-button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-more-button': MoreButton
  }
}
