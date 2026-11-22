import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import {
  surfaceBaseStyles,
  surfaceElevatedStyles,
} from '@/components/common/surface/surface.styles'
import '@/components/common'
import { emit } from '@/utils'

/**
 * AI 툴 실행 승인 요청 UI.
 * 승인·거부하면 approve·reject 이벤트만 발행하고, 결과 표시는 소비자가 이어서 맡는다.
 */
@customElement('mm-chat-confirmation')
export class ChatConfirmation extends LitElement {
  static styles = css`
    :host {
      ${surfaceBaseStyles};
      ${surfaceElevatedStyles};
      --surface-padding: 0;

      max-width: min(85%, calc(var(--size-80) * 6));
    }

    /* 면의 경계는 host가 그리므로, 안의 notice는 자기 경계를 그리지 않는다. */
    mm-notice {
      --notice-border: none;
    }
  `
  @property({ type: String }) message = ''

  render() {
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
    emit(this, 'approve')
  }

  private handleRejectClick() {
    emit(this, 'reject')
  }
}
