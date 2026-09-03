import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import '@/components/common/icon-button/icon-button'
import { iconButtonActionStyles } from '@/components/common/icon-button/icon-button.styles'
import { withIconAction } from '@/components/common/icon-button/icon-button.utils'
import { ICON_NAMES } from '@/components/common/icon-button/semantics/icon-names'

@customElement('mm-prev-button')
export class PrevButton extends withIconAction(LitElement, 'prev') {
  static styles = [iconButtonActionStyles]

  render() {
    return html`
      <mm-icon-button
        icon=${ICON_NAMES.PREVIOUS}
        variant="secondary"
        aria-label="이전"
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
    'mm-prev-button': PrevButton
  }
}
