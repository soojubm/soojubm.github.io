import { LitElement, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import { interactiveControlStyles } from '@/components/common/button/button.styles'
import { iconButtonStyles } from '@/components/common/icon-button/icon-button.styles'
import { renderIconAction } from '@/components/common/icon-button/icon-button.utils'
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
  static styles = [
    interactiveControlStyles,
    iconButtonStyles,
    css`
      :host {
        --icon-button-background-color: transparent;
      }
    `,
  ]

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
    return renderIconAction({
      icon: this.copied ? ICON_NAMES.COPY_SUCCESS : ICON_NAMES.COPY,
      ariaLabel: this.copied ? '복사됨' : '복사',
      tooltip: this.copied ? '복사됨' : this.tooltip,
      tooltipPlacement: this.tooltipPlacement,
      onClick: this.handleClick,
    })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-copy-button': CopyButton
  }
}
