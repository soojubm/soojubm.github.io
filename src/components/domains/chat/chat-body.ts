import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { scrollbarStyles } from '@/stylesheets/shared.styles'

@customElement('mm-chat-body')
export class ChatBody extends LitElement {
  static styles = css`
    :host {
      display: block;
      flex: 1;
      min-height: 0;
      box-sizing: border-box;
      overflow-x: hidden;
      overflow-y: auto;

      ${scrollbarStyles}
    }
  `

  render() {
    return html`
      <slot></slot>
    `
  }
}
