// keyword-tag.ts

import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import './tag'

@customElement('mm-keyword-tag')
export class KeywordTag extends LitElement {
  /**
   * optional semantic time support
   */

  @property({ type: String })
  datetime?: string

  render() {
    return html`
      <mm-tag tone="gray" .datetime=${this.datetime}>
        <slot name="icon" slot="icon"></slot>

        <slot></slot>
      </mm-tag>
    `
  }
}

export default KeywordTag
