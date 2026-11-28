import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import '@/components/common/scroll/scroll'

@customElement('fff-chat-suggestions')
export class ChatSuggestions extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    ::slotted(fff-chat-suggestion) {
      flex-shrink: 0;
    }
  `

  render() {
    return html`
      <fff-scroll gap="2" hide-scrollbar>
        <slot></slot>
      </fff-scroll>
    `
  }
}
