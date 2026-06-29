import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { resetStyles } from '@/stylesheets/shared/reset.styles'
import { emit } from '@/utils/emit'

import { renderChatMessageFailedActions, renderChatMessageTime } from './chat.helpers'

import '@/components/flex/flex'

@customElement('mm-my-chat-message')
export class MyChatMessage extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
      }

      .time {
        color: var(--color-foreground-light);
      }

      ::slotted(mm-my-chat-bubble) {
        align-self: flex-end;
      }

      :host([failed]) ::slotted(mm-my-chat-bubble) {
        --my-chat-bubble-background: color-mix(
          in srgb,
          var(--color-danger) 12%,
          var(--color-background)
        );
        --my-chat-bubble-border: 1px solid var(--color-danger);
        --my-chat-bubble-color: var(--color-foreground);
      }

      .failed-row {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        justify-content: flex-end;
      }

      .failed-status {
        color: var(--color-danger);
        white-space: nowrap;
      }
    `,
  ]

  @property({ type: String }) datetime = ''
  @property({ type: Boolean, reflect: true }) failed = false

  render() {
    return html`
      <mm-flex direction="column" gap="2" align-items="end">
        <slot></slot>
        ${renderChatMessageFailedActions(this.failed, () => this.handleRetry())}
        ${renderChatMessageTime(this.datetime)}
      </mm-flex>
    `
  }

  private handleRetry() {
    emit(this, 'retry')
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-my-chat-message': MyChatMessage
  }
}
