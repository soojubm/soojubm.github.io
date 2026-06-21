import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'
import '../../button/button'
import '../../notice/notice'
import '../../text/text'

export type ConfirmationStatus = 'pending' | 'accepted' | 'rejected'

/**
 * AI 툴 실행 승인 요청 UI.
 * status="pending"  → 승인/거부 버튼 표시
 * status="accepted" → 승인 완료 상태 표시
 * status="rejected" → 거부 완료 상태 표시
 */
@customElement('mm-chat-confirmation')
export class ChatConfirmation extends LitElement {
  /** 현재 상태 */
  @property({ type: String, reflect: true }) status: ConfirmationStatus = 'pending'
  /** 요청 메시지 (없으면 슬롯 콘텐츠 사용) */
  @property({ type: String }) message = ''
  /** 승인 버튼 레이블 */
  @property({ type: String, attribute: 'approve-label' }) approveLabel = '승인'
  /** 거부 버튼 레이블 */
  @property({ type: String, attribute: 'reject-label' }) rejectLabel = '거부'

  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
        max-width: min(85%, 480px);
      }

      mm-notice > mm-paragraph {
        flex: 1;
      }

      .actions {
        display: flex;
        gap: var(--space-2);
      }
    `,
  ]

  private _approve() {
    this.status = 'accepted'
    this.dispatchEvent(new CustomEvent('confirmation-approve', { bubbles: true, composed: true }))
  }

  private _reject() {
    this.status = 'rejected'
    this.dispatchEvent(new CustomEvent('confirmation-reject', { bubbles: true, composed: true }))
  }

  render() {
    if (this.status === 'accepted') {
      return html`
        <mm-notice variant="success" text="승인했습니다"></mm-notice>
      `
    }

    if (this.status === 'rejected') {
      return html`
        <mm-notice variant="danger" text="거부했습니다"></mm-notice>
      `
    }

    return html`
      <mm-notice heading="승인 요청">
        <mm-paragraph>
          ${this.message
            ? this.message
            : html`
                <slot></slot>
              `}
        </mm-paragraph>
        <div class="actions">
          <mm-button variant="tertiary" size="medium" @click=${this._reject}>
            ${this.rejectLabel}
          </mm-button>
          <mm-button variant="tertiary" size="medium" @click=${this._approve}>
            ${this.approveLabel}
          </mm-button>
        </div>
      </mm-notice>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-chat-confirmation': ChatConfirmation
  }
}
