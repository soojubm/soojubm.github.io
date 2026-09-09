import { LitElement, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/common/icon/icon-names'
import { iconButtonStyles } from '@/components/common/icon-button/icon-button.styles'
import { renderIconAction } from '@/components/common/icon-button/icon-button.utils'

/**
 * 입력값을 비우는 버튼. 입력 필드 안에 놓이므로 아이콘 버튼 중 가장 작은 크기를 쓴다.
 */
@customElement('mm-clear-button')
export class ClearButton extends LitElement {
  static styles = [
    iconButtonStyles,
    css`
      :host {
        --icon-button-size: var(--size-16);
        --icon-button-border-radius: var(--radius-full);
      }
    `,
  ]

  @property({ type: String, attribute: 'aria-label' }) ariaLabel = ''
  @property({ type: String }) tooltip = ''
  @property({ type: String, attribute: 'tooltip-placement' }) tooltipPlacement = ''
  @property({ type: Boolean }) disabled = false

  render() {
    return renderIconAction({
      icon: ICON_NAMES.CLOSE,
      ariaLabel: this.ariaLabel,
      tooltip: this.tooltip,
      tooltipPlacement: this.tooltipPlacement,
      disabled: this.disabled,
    })
  }
}
