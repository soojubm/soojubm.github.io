import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { renderChatDate } from '@/components/domains/chat/chat.helpers'

import '@/components/common'

@customElement('fff-chat-date')
export class ChatDate extends LitElement {
  static styles = css`
    :host {
      display: flex;
      justify-content: center;
    }
  `
  @property({ type: String }) datetime = ''

  render() {
    return html`
      <fff-tag>${renderChatDate(this.datetime)}</fff-tag>
    `
  }
}
