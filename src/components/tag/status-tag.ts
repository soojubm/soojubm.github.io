// status-tag.ts

import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import './tag'

import { statusToneMap, type StatusVariant } from './tag.styles'

@customElement('mm-status-tag')
export class StatusTag extends LitElement {
  /**
   * semantic status layer
   */

  @property({ type: String })
  variant: StatusVariant = 'neutral'

  @property({ type: String })
  datetime?: string

  render() {
    const tone = statusToneMap[this.variant]

    return html`
      <mm-tag tone=${tone} .datetime=${this.datetime}>
        <slot name="icon" slot="icon"></slot>

        <slot> ${this.variant} </slot>
      </mm-tag>
    `
  }
}

export default StatusTag
