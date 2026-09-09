import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { resetStyles } from '@/stylesheets/shared.styles'
import { emit } from '@/utils'

import { renderChatMessageFailedActions, renderChatMessageTime } from './chat.helpers'

@customElement('mm-my-chat-message')
export class MyChatMessage extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: var(--space-2);
      }

      .failed-actions {
        display: flex;
        align-items: center;
        gap: var(--space-1);
      }

      ::slotted(mm-my-chat-bubble) {
        align-self: flex-end;
      }

      :host([failed]) ::slotted(mm-my-chat-bubble) {
        --chat-bubble-background-color: color-mix(
          in srgb,
          var(--danger-color) 12%,
          var(--background-color)
        );
        --chat-bubble-border: var(--border-danger);
        --chat-bubble-text-color: var(--foreground-color);
      }
    `,
  ]

  @property({ type: String }) datetime = ''
  @property({ type: Boolean, reflect: true }) failed = false

  render() {
    return html`
      <slot></slot>
      ${renderChatMessageFailedActions(this.failed, () => this.handleRetry())}
      ${renderChatMessageTime(this.datetime)}
    `
  }

  private handleRetry() {
    emit(this, 'retry')
  }
}
