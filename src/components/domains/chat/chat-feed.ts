import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { resetStyles } from '../../shared/reset.styles'

@customElement('mm-chat-feed')
export class ChatFeed extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--space-4);
        overflow-y: auto;
      }
    `,
  ]

  render() {
    return html`<slot></slot>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-chat-feed': ChatFeed
  }
}
