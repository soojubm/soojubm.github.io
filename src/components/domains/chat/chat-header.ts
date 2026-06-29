import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { resetStyles } from '@/stylesheets/shared/reset.styles'

@customElement('mm-chat-header')
export class ChatHeader extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
        width: 100%;
        max-width: calc(var(--layout-width-small) + var(--space-4) * 10);
        flex-shrink: 0;
        margin: 0 auto;
        padding: var(--space-3) var(--space-4);
        box-sizing: border-box;
      }

      :host(:empty) {
        display: none;
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
    'mm-chat-header': ChatHeader
  }
}
