import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import '@/components/common/icon-button/icon-button'
import { iconButtonActionStyles } from '@/components/common/icon-button/icon-button.styles'
import { withIconAction } from '@/components/common/icon-button/icon-button.utils'
import { ICON_NAMES } from '@/components/common/icon-button/semantics/icon-names'

@customElement('mm-next-button')
export class NextButton extends withIconAction(LitElement, 'next') {
  static styles = [iconButtonActionStyles]

  render() {
    return html`
      <mm-icon-button
        icon=${ICON_NAMES.NEXT}
        variant="secondary"
        aria-label="다음"
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
    'mm-next-button': NextButton
  }
}
