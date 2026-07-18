import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/icon-button/icon-button'
import { iconButtonActionStyles } from '@/components/icon-button/icon-button.styles'
import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'
import { emit } from '@/utils/emit'

/**
 * 아이템·데이터를 영구 삭제하는 파괴적 액션 버튼.
 */
@customElement('mm-delete-button')
export class DeleteButton extends LitElement {
  static styles = [iconButtonActionStyles]

  @property({ type: String, attribute: 'confirm-message' })
  confirmMessage = '정말 삭제하시겠어요?'

  @property({ type: String }) tooltip = ''
  @property({ type: String, attribute: 'tooltip-placement' }) tooltipPlacement = ''
  @property({ type: Boolean }) disabled = false

  private handleClick = () => {
    if (this.disabled) return
    if (!window.confirm(this.confirmMessage)) return
    emit(this, 'delete')
  }

  render() {
    return html`
      <mm-icon-button
        icon=${ICON_NAMES.DELETE}
        variant="destructive"
        aria-label="삭제"
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
    'mm-delete-button': DeleteButton
  }
}
