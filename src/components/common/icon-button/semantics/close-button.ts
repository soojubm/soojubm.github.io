import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import '@/components/common/icon-button/icon-button'
import { iconButtonActionStyles } from '@/components/common/icon-button/icon-button.styles'
import { withIconAction } from '@/components/common/icon-button/icon-button.utils'
import { ICON_NAMES } from '@/components/common/icon-button/semantics/icon-names'

/**
 * 모달, 패널, 시트 등 레이어를 닫는 버튼.
 */
@customElement('mm-close-button')
export class CloseButton extends withIconAction(LitElement, 'close') {
  static styles = [iconButtonActionStyles]

  render() {
    return html`
      <mm-icon-button
        icon=${ICON_NAMES.CLOSE}
        variant="secondary"
        aria-label="닫기"
        tooltip=${this.tooltip}
        tooltip-placement=${this.tooltipPlacement}
        ?disabled=${this.disabled}
        @click=${this.handleActionClick}
      ></mm-icon-button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-close-button': CloseButton
  }
}
