import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'
import { ICON_NAMES } from '../../icon-button/semantics/icon-names'
import '../../button/button'
import '../../icon/icon'
import '../../text/semantics/paragraph'

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

      .confirmation {
        border: var(--border);
        border-radius: var(--radius);
        background: var(--color-background-subtle);
        overflow: hidden;
      }

      /* ── pending ── */
      .body {
        padding: var(--space-3) var(--space-3) var(--space-2);
      }

      .icon-row {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        margin-bottom: var(--space-2);
        color: var(--color-foreground-light);
        font-size: var(--font-size-12);
        font-weight: var(--font-weight-bold);
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }


      .actions {
        display: flex;
        gap: var(--space-2);
        padding: var(--space-2) var(--space-3) var(--space-3);
      }


      /* ── result ── */
      .result {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        padding: var(--space-3);
        font-size: var(--font-size-14);
      }

      .result-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.25rem;
        height: 1.25rem;
        border-radius: 50%;
        flex-shrink: 0;
      }

      :host([status='accepted']) .result-icon {
        color: var(--color-success);
        background: var(--color-success-subtle);
      }

      :host([status='rejected']) .result-icon {
        color: var(--color-danger);
        background: var(--color-danger-subtle);
      }

      :host([status='accepted']) .result-text {
        color: var(--color-success);
      }

      :host([status='rejected']) .result-text {
        color: var(--color-danger);
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
        <div class="confirmation">
          <div class="result">
            <span class="result-icon">
              <mm-icon name=${ICON_NAMES.CHECK} style="font-size:0.75rem"></mm-icon>
            </span>
            <span class="result-text">승인했습니다</span>
          </div>
        </div>
      `
    }

    if (this.status === 'rejected') {
      return html`
        <div class="confirmation">
          <div class="result">
            <span class="result-icon">
              <mm-icon name=${ICON_NAMES.CLOSE} style="font-size:0.75rem"></mm-icon>
            </span>
            <span class="result-text">거부했습니다</span>
          </div>
        </div>
      `
    }

    return html`
      <div class="confirmation">
        <div class="body">
          <div class="icon-row">
            <mm-icon name=${ICON_NAMES.INFO}></mm-icon>
            <span>승인 요청</span>
          </div>
          <mm-paragraph class="message">
            ${this.message ? this.message : html`<slot></slot>`}
          </mm-paragraph>
        </div>
        <div class="actions">
          <mm-button variant="tertiary" size="medium" @click=${this._reject}>
            ${this.rejectLabel}
          </mm-button>
          <mm-button variant="tertiary" size="medium" @click=${this._approve}>
            ${this.approveLabel}
          </mm-button>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-chat-confirmation': ChatConfirmation
  }
}
