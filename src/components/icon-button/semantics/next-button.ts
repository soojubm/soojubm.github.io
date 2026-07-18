import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/icon-button/icon-button'
import { iconButtonActionStyles } from '@/components/icon-button/icon-button.styles'
import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'
import { emit } from '@/utils/emit'

@customElement('mm-next-button')
export class NextButton extends LitElement {
  static styles = [iconButtonActionStyles]

  @property({ type: String }) tooltip = ''
  @property({ type: String, attribute: 'tooltip-placement' }) tooltipPlacement = ''
  @property({ type: Boolean }) disabled = false

  private handleClick = () => {
    if (this.disabled) return
    emit(this, 'next')
  }

  render() {
    return html`
      <mm-icon-button
        icon=${ICON_NAMES.NEXT}
        variant="secondary"
        aria-label="다음"
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
    'mm-next-button': NextButton
  }
}
