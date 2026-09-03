import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common/icon-button/icon-button'
import { iconButtonActionStyles } from '@/components/common/icon-button/icon-button.styles'
import { ICON_NAMES } from '@/components/common/icon-button/semantics/icon-names'

/**
 * 입력값을 비우는 버튼. 입력 필드 안에 놓이므로 아이콘 버튼 중 가장 작은 크기를 쓴다.
 */
@customElement('mm-clear-button')
class ClearButton extends LitElement {
  static styles = [iconButtonActionStyles]

  @property({ type: String, attribute: 'aria-label' }) ariaLabel = ''
  @property({ type: String }) tooltip = ''
  @property({ type: String, attribute: 'tooltip-placement' }) tooltipPlacement = ''
  @property({ type: Boolean }) disabled = false

  render() {
    return html`
      <mm-icon-button
        icon=${ICON_NAMES.CLOSE}
        variant="tertiary"
        size="xsmall"
        shape="circle"
        aria-label=${this.ariaLabel}
        tooltip=${this.tooltip}
        tooltip-placement=${this.tooltipPlacement}
        ?disabled=${this.disabled}
      ></mm-icon-button>
    `
  }
}

export default ClearButton

declare global {
  interface HTMLElementTagNameMap {
    'mm-clear-button': ClearButton
  }
}
