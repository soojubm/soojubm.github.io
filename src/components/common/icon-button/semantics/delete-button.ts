import { LitElement, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { iconButtonStyles } from '@/components/common/icon-button/icon-button.styles'
import { renderIconAction, withIconAction } from '@/components/common/icon-button/icon-button.utils'
import { ICON_NAMES } from '@/components/common/icon-button/semantics/icon-names'

/**
 * 아이템·데이터를 영구 삭제하는 파괴적 액션 버튼.
 */
@customElement('mm-delete-button')
export class DeleteButton extends withIconAction(LitElement, 'delete') {
  static styles = [
    iconButtonStyles,
    css`
      :host {
        --icon-button-background-color: var(--color-danger);
        --icon-button-text-color: var(--foreground-color-on-solid);
      }
    `,
  ]

  @property({ type: String, attribute: 'confirm-message' })
  confirmMessage = '정말 삭제하시겠어요?'

  render() {
    return renderIconAction({
      icon: ICON_NAMES.DELETE,
      ariaLabel: '삭제',
      tooltip: this.tooltip,
      tooltipPlacement: this.tooltipPlacement,
      disabled: this.disabled,
      onClick: this.handleActionClick,
    })
  }

  // 파괴적 행동이라 확인을 거친 뒤에만 알린다.
  override handleActionClick() {
    if (!window.confirm(this.confirmMessage)) return

    super.handleActionClick()
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-delete-button': DeleteButton
  }
}
