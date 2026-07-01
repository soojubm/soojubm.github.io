import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { resetStyles } from '@/stylesheets/shared/reset.styles'
import '@/components/flex/flex'

@customElement('mm-chat-footer')
export class ChatFooter extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
        padding: var(--space-4);
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
    'mm-chat-footer': ChatFooter
  }
}
