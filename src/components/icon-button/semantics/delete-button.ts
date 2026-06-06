import { css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import IconButton from '../icon-button'
import { ICON_NAMES } from './icon-names'

/**
 * 아이템·데이터를 영구 삭제하는 파괴적 액션 버튼.
 * destructive — 빨간 아이콘
 */
@customElement('mm-delete-button')
export class DeleteButton extends IconButton {
  /** confirm 다이얼로그에 표시할 메시지 */
  @property({ type: String, attribute: 'confirm-message' })
  confirmMessage = '정말 삭제하시겠어요?'

  static override styles = [
    ...IconButton.styles,
    css`
      .icon-button[data-variant='destructive'] {
        background: transparent;
        color: var(--color-status-negative, #c0392b);
        border: none;
      }
    `,
  ]

  constructor() {
    super()
    this.icon = ICON_NAMES.DELETE
    this.variant = 'destructive'
    this.ariaLabel = '삭제'
  }

  override connectedCallback() {
    super.connectedCallback()
    this.addEventListener('click', this._handleClick)
  }

  override disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener('click', this._handleClick)
  }

  private _handleClick = () => {
    if (!window.confirm(this.confirmMessage)) return
    this.dispatchEvent(new CustomEvent('delete', { bubbles: true, composed: true }))
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-delete-button': DeleteButton
  }
}
