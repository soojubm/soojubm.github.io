import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('mm-chat-feed')
export class ChatFeed extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-section);
      flex: none;
      width: 100%;
      max-width: var(--layout-width-small);
      margin: var(--space-8) auto 0;
      box-sizing: border-box;
    }
  `

  render() {
    return html`
      <slot></slot>
    `
  }
}
