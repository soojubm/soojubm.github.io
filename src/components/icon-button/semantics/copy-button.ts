import { LitElement, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import '@/components/icon-button/icon-button'
import { iconButtonActionStyles } from '@/components/icon-button/icon-button.styles'
import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'
import { copyToClipboard } from '@/utils/clipboard'
import { emit } from '@/utils/emit'

/**
 * 텍스트를 클립보드에 복사하는 버튼.
 * 복사 성공 시 일시적으로 체크 아이콘으로 전환됩니다.
 */
@customElement('mm-copy-button')
export class CopyButton extends LitElement {
  static styles = [iconButtonActionStyles]

  @property({ type: String }) value = ''
  @property({ type: String }) tooltip = ''
  @property({ type: String, attribute: 'tooltip-placement' }) tooltipPlacement = ''
  @state() private copied = false

  private handleClick = async () => {
    const text = this.value || this.textContent?.trim() || ''
    if (!(await copyToClipboard(text))) return

    this.copied = true
    emit(this, 'copy', { value: text })
    setTimeout(() => (this.copied = false), 1500)
  }

  render() {
    return html`
      <mm-icon-button
        icon=${this.copied ? ICON_NAMES.COPY_SUCCESS : ICON_NAMES.COPY}
        aria-label=${this.copied ? '복사됨' : '복사'}
        variant="ghost"
        tooltip=${this.copied && this.tooltip ? '복사됨' : this.tooltip}
        tooltip-placement=${this.tooltipPlacement}
        @click=${this.handleClick}
      ></mm-icon-button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-copy-button': CopyButton
  }
}
