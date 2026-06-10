import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'

@customElement('mm-chat-header')
export class ChatHeader extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        flex-shrink: 0;
      }

      :host(:empty) {
        display: none;
      }

      .inner {
        width: 100%;
        max-width: calc(var(--layout-width-small) + var(--space-4) * 10);
        margin: 0 auto;
        padding: var(--space-3) var(--space-4);
        box-sizing: border-box;
      }
    `,
  ]

  render() {
    return html`
      <div class="inner">
        <slot></slot>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-chat-header': ChatHeader
  }
}
