import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import '@/components/common/scroll/scroll'

@customElement('mm-chat-suggestions')
export class ChatSuggestions extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    ::slotted(mm-chat-suggestion) {
      flex-shrink: 0;
    }
  `

  render() {
    return html`
      <mm-scroll gap="2" hide-scrollbar>
        <slot></slot>
      </mm-scroll>
    `
  }
}
