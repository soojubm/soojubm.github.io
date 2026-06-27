import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '@/stylesheets/shared/reset.styles'

@customElement('mm-chat-date')
export class ChatDate extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
        justify-content: center;
      }
    `,
  ]

  @property({ type: String }) label = ''

  render() {
    return html`
      <mm-tag>
        ${this.label}
        <slot></slot>
      </mm-tag>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-chat-date': ChatDate
  }
}
