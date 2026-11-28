import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('fff-chat-header')
export class ChatHeader extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      max-width: min(var(--layout-width-small), calc(100% - 2 * var(--layout-padding-inline)));
      flex-shrink: 0;
      margin: 0 auto;
      padding-block: var(--space-3);
      box-sizing: border-box;
    }

    :host(:empty) {
      display: none;
    }
  `

  render() {
    return html`
      <slot></slot>
    `
  }
}
