import { LitElement, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/common/icon/icon-names'
import { iconButtonStyles } from '@/components/common/icon-button/icon-button.styles'
import { renderIconAction } from '@/components/common/icon-button/icon-button.utils'
import { TransientFlagController } from '@/controllers/transient-flag-controller'
import { resetStyles } from '@/stylesheets/shared.styles'
import { emit } from '@/utils'
import { copyToClipboard } from '@/utils/clipboard'

/**
 * 텍스트를 클립보드에 복사하는 버튼.
 * 복사 성공 시 일시적으로 체크 아이콘으로 전환됩니다.
 */
@customElement('mm-copy-button')
export class CopyButton extends LitElement {
  static styles = [
    resetStyles,
    iconButtonStyles,
    css`
      :host {
        --icon-button-background-color: transparent;
      }
    `,
  ]
  @property({ type: String }) value = ''
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
      tooltipPlacement: this.tooltipPlacement,
      onClick: this.handleClick,
    })
  }
}
