import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { iconButtonStyles } from '../button/icon-button.styles'

/**
 * 아이템·데이터를 영구 삭제하는 파괴적 액션 버튼.
 * destructive — 빨간 아이콘
 */
@customElement('mm-delete-button')
export class DeleteButton extends LitElement {
  @property({ type: String, attribute: 'aria-label' })
  override ariaLabel = '삭제'

  /** confirm 다이얼로그에 표시할 메시지 */
  @property({ type: String, attribute: 'confirm-message' })
  confirmMessage = '정말 삭제하시겠어요?'

  static styles = [
    iconButtonStyles,
    css`
      .icon-button[data-variant='destructive'] {
        background: transparent;
        color: var(--color-status-negative, #c0392b);
        border: none;
      }
    `,
  ]

  private handleClick() {
    if (!window.confirm(this.confirmMessage)) return
    this.dispatchEvent(new CustomEvent('delete', { bubbles: true, composed: true }))
  }

  render() {
    return html`
      <button
        type="button"
        class="icon-button"
        data-variant="destructive"
        aria-label=${this.ariaLabel}
        @click=${this.handleClick}
      >
        <mm-icon name="trash"></mm-icon>
      </button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-delete-button': DeleteButton
  }
}
