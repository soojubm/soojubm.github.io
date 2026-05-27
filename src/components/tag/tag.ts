// tag.ts

import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import { tagStyles, type TagTone } from './tag.styles'

@customElement('mm-tag')
export class Tag extends LitElement {
  /**
   * purely visual primitive
   */

  @property({ type: String })
  tone: TagTone = 'gray'

  /**
   * optional semantic time support
   */

  @property({ type: String })
  datetime?: string

  static styles = [tagStyles]

  render() {
    const innerContent = html`
      <slot name="icon"></slot>
      <slot></slot>
    `

    if (this.datetime) {
      return html`
        <time data-tone=${this.tone} datetime=${ifDefined(this.datetime)}> ${innerContent} </time>
      `
    }

    return html` <span data-tone=${this.tone}> ${innerContent} </span> `
  }
}

export default Tag
