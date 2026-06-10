import { css } from 'lit'
import { customElement } from 'lit/decorators.js'
import { ChatMessageBase } from './chat-message'

@customElement('mm-my-chat-message')
export class MyChatMessage extends ChatMessageBase {
  static styles = [
    ...ChatMessageBase.styles,
    css`
      :host {
        align-items: flex-end;
      }

      ::slotted(mm-my-chat-bubble) {
        align-self: flex-end;
        justify-content: flex-end;
      }
    `,
  ]
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-my-chat-message': MyChatMessage
  }
}
