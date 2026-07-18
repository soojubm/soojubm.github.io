import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/icon-button/icon-button'
import { iconButtonActionStyles } from '@/components/icon-button/icon-button.styles'
import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'
import { emit } from '@/utils/emit'

/**
 * 모달, 패널, 시트 등 레이어를 닫는 버튼.
 */
@customElement('mm-close-button')
export class CloseButton extends LitElement {
  static styles = [iconButtonActionStyles]

  @property({ type: String }) tooltip = ''
  @property({ type: String, attribute: 'tooltip-placement' }) tooltipPlacement = ''
  @property({ type: Boolean }) disabled = false

  private handleClick = () => {
    emit(this, 'close')
  }

  render() {
    return html`
      <mm-icon-button
        icon=${ICON_NAMES.CLOSE}
        variant="secondary"
        aria-label="닫기"
        tooltip=${this.tooltip}
        tooltip-placement=${this.tooltipPlacement}
        ?disabled=${this.disabled}
        @click=${this.handleClick}
      ></mm-icon-button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-close-button': CloseButton
  }
}
