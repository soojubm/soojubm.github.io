import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { renderChatMessageTime } from '@/components/domains/chat/chat.helpers'

import '@/components/common'

@customElement('fff-ai-chat-message')
export class AiChatMessage extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }

    ::slotted(fff-ai-chat-bubble) {
      align-self: flex-start;
    }
  `
  @property({ type: String }) datetime = ''

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'group')
    if (!this.hasAttribute('aria-label')) this.setAttribute('aria-label', 'AI의 메시지')
  }

  render() {
    return html`
      <slot></slot>
      ${renderChatMessageTime(this.datetime)}
    `
  }
}
