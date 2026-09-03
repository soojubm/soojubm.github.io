import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import '@/components/common/icon-button/icon-button'
import { iconButtonActionStyles } from '@/components/common/icon-button/icon-button.styles'
import { withIconAction } from '@/components/common/icon-button/icon-button.utils'
import { ICON_NAMES } from '@/components/common/icon-button/semantics/icon-names'

/**
 * 배너, 알림, 토스트 등 비파괴적 해제 버튼.
 */
@customElement('mm-dismiss-button')
export class DismissButton extends withIconAction(LitElement, 'dismiss') {
  static styles = [iconButtonActionStyles]

  render() {
    return html`
      <mm-icon-button
        variant="tertiary"
        size="small"
        icon=${ICON_NAMES.DISMISS}
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
    'mm-dismiss-button': DismissButton
  }
}
