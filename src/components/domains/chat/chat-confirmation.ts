import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import {
  surfaceBaseStyles,
  surfaceElevatedStyles,
} from '@/components/common/surface/surface.styles'
import '@/components/common'
import { emit } from '@/utils'

@customElement('fff-chat-confirmation')
export class ChatConfirmation extends LitElement {
  static styles = css`
    :host {
      ${surfaceBaseStyles};
      ${surfaceElevatedStyles};
      --surface-padding: 0;

      max-width: min(85%, calc(var(--size-80) * 6));
    }

    /* 면의 경계는 host가 그리므로, 안의 notice는 자기 경계를 그리지 않는다. */
    fff-notice {
      --notice-border: none;
    }
  `
  @property({ type: String }) message = ''

  render() {
    return html`
      <fff-notice description=${this.message}>
        <slot></slot>
        <fff-button-group>
          <fff-button variant="secondary" size="medium" @click=${this.handleRejectClick}>
            거부
          </fff-button>
          <fff-button variant="primary" size="medium" @click=${this.handleApproveClick}>
            승인
          </fff-button>
        </fff-button-group>
      </fff-notice>
    `
  }

  private handleApproveClick() {
    emit(this, 'approve')
  }

  private handleRejectClick() {
    emit(this, 'reject')
  }
}
