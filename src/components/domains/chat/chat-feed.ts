import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'

@customElement('mm-chat-feed')
export class ChatFeed extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        flex: none;
        width: 100%;
        max-width: 800px;
        margin: 2rem auto;
        box-sizing: border-box;
        gap: 4rem;
        /* TODO gap-section */
      }
    `,
  ]

  render() {
    return html`
      <slot></slot>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-chat-feed': ChatFeed
  }
}
