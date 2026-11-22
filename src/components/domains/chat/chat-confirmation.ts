import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common'
import { emit } from '@/utils'

export type ConfirmationStatus = 'pending' | 'approved' | 'rejected'

/**
 * AI 툴 실행 승인 요청 UI.
 * 승인·거부하면 status가 approved·rejected로 바뀌고 같은 이름의 approve·reject 이벤트를 발행한다.
 * status="pending"  → 승인/거부 버튼 표시
 * status="approved" → 승인 완료 상태 표시
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
    if (this.status === 'approved') {
      return html`
        <mm-notice variant="info" description="승인했습니다"></mm-notice>
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
          <mm-button variant="secondary" size="medium" @click=${this.handleRejectClick}>
            거부
          </mm-button>
          <mm-button variant="primary" size="medium" @click=${this.handleApproveClick}>
            승인
          </mm-button>
        </mm-button-group>
      </mm-notice>
    `
  }

  private handleApproveClick() {
    this.status = 'approved'
    emit(this, 'approve')
  }

  private handleRejectClick() {
    this.status = 'rejected'
    emit(this, 'reject')
  }
}
