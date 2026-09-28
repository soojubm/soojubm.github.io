import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common'
import { emit } from '@/utils'

export type ConfirmationStatus = 'pending' | 'accepted' | 'rejected'

/**
 * AI 툴 실행 승인 요청 UI.
 * status="pending"  → 승인/거부 버튼 표시
 * status="accepted" → 승인 완료 상태 표시
 * status="rejected" → 거부 완료 상태 표시
 */
@customElement('mm-chat-confirmation')
export class ChatConfirmation extends LitElement {
  static styles = css`
    :host {
      display: block;
      max-width: min(85%, 480px);
    }
  `
  @property({ type: String }) status: ConfirmationStatus = 'pending'
  @property({ type: String }) message = ''

  render() {
    if (this.status === 'accepted') {
      return html`
        <mm-notice variant="success" description="승인했습니다"></mm-notice>
      `
    }

    if (this.status === 'rejected') {
      return html`
        <mm-notice variant="error" description="거부했습니다"></mm-notice>
      `
    }

    return html`
      <mm-notice heading="승인 요청" description=${this.message}>
        <slot></slot>
        <mm-button-group>
          <mm-button variant="tertiary" size="medium" @click=${this.handleRejectClick}>
            거부
          </mm-button>
          <mm-button variant="tertiary" size="medium" @click=${this.handleApproveClick}>
            승인
          </mm-button>
        </mm-button-group>
      </mm-notice>
    `
  }

  private handleApproveClick() {
    this.status = 'accepted'
    emit(this, 'confirmation-approve')
  }

  private handleRejectClick() {
    this.status = 'rejected'
    emit(this, 'confirmation-reject')
  }
}
