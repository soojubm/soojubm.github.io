import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { resetStyles } from '@/stylesheets/shared/reset.styles'
import '@/components/flex/flex'

@customElement('mm-chat-feed')
export class ChatFeed extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
        flex: none;
        width: 100%;
        max-width: 800px;
        margin: var(--space-8) auto;
        box-sizing: border-box;
      }
    `,
  ]

  render() {
    return html`
      <mm-flex direction="column" gap="section">
        <slot></slot>
      </mm-flex>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-chat-feed': ChatFeed
  }
}
