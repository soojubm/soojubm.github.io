import { LitElement, css } from 'lit'
import { customElement } from 'lit/decorators.js'

import { interactiveControlStyles } from '@/components/common/button/button.styles'
import { iconButtonStyles } from '@/components/common/icon-button/icon-button.styles'
import { renderIconAction, withIconAction } from '@/components/common/icon-button/icon-button.utils'
import { ICON_NAMES } from '@/components/common/icon-button/semantics/icon-names'

/**
 * 배너, 알림, 토스트 등 비파괴적 해제 버튼.
 */
@customElement('mm-dismiss-button')
export class DismissButton extends withIconAction(LitElement, 'dismiss') {
  static styles = [
    interactiveControlStyles,
    iconButtonStyles,
    css`
      :host {
        --icon-button-size: var(--size-24);
      }
    `,
  ]

  render() {
    return renderIconAction({
      icon: ICON_NAMES.DISMISS,
      ariaLabel: '닫기',
      tooltip: this.tooltip,
      tooltipPlacement: this.tooltipPlacement,
      disabled: this.disabled,
      onClick: this.handleActionClick,
    })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-dismiss-button': DismissButton
  }
}
