import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { resetStyles } from '@/stylesheets/shared/reset.styles'
import '@/components/flex/flex'

@customElement('mm-chat-date')
export class ChatDate extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
      }
    `,
  ]

  @property({ type: String }) label = ''

  render() {
    return html`
      <mm-flex justify-content="center">
        <mm-tag>
          ${this.label}
          <slot></slot>
        </mm-tag>
      </mm-flex>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-chat-date': ChatDate
  }
}
