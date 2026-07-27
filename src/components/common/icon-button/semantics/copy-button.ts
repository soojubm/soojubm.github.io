import { LitElement, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import '@/components/common/icon-button/icon-button'
import { iconButtonActionStyles } from '@/components/common/icon-button/icon-button.styles'
import { ICON_NAMES } from '@/components/common/icon-button/semantics/icon-names'
import { TransientFlagController } from '@/controllers/transient-flag-controller'
import { emit } from '@/utils'

/**
 * navigator.clipboard를 우선 사용하고, 실패하면 임시 textarea + execCommand로 폴백한다.
 * 성공 여부를 boolean으로 반환한다.
 */
const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return copyWithFallback(text)
  }
}

const copyWithFallback = (text: string): boolean => {
  try {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.setAttribute('readonly', '')
    textarea.style.position = 'absolute'
    textarea.style.left = '-9999px'
    document.body.append(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
    return true
  } catch {
    return false
  }
}

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

  private copiedFlag = new TransientFlagController(this, {
    duration: 1500,
    onChange: copied => (this.copied = copied),
  })

  private handleClick = async () => {
    const text = this.value || this.textContent?.trim() || ''
    if (!(await copyToClipboard(text))) return

    emit(this, 'copy', { value: text })
    this.copiedFlag.trigger()
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
