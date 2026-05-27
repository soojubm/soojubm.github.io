// accent-tag.ts

import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import './tag'

@customElement('mm-accent-tag')
export class AccentTag extends LitElement {
  /**
   * optional semantic time support
   */

  @property({ type: String })
  datetime?: string

  render() {
    return html`
      <mm-tag tone="blue" .datetime=${this.datetime}>
        <slot name="icon" slot="icon"></slot>

        <slot></slot>
      </mm-tag>
    `
  }
}

export default AccentTag
