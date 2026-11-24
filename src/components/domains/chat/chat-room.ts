import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('mm-chat-room')
export class ChatRoom extends LitElement {
  static styles = css`
    :host {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: hidden;
    }
  `

  render() {
    return html`
      <slot></slot>
    `
  }
}
