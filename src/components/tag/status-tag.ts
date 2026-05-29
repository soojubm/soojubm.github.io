import { html, type PropertyValues } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { Tag } from './tag'
import { statusToneMap, type StatusVariant } from './tag.styles'

@customElement('mm-status-tag')
export class StatusTag extends Tag {
  @property({ type: String }) variant: StatusVariant = 'neutral'

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties)
    if (changedProperties.has('variant')) {
      this.tone = statusToneMap[this.variant]
    }
  }

  protected override renderDefaultSlot() {
    return html`<slot>${this.variant}</slot>`
  }
}

export default StatusTag
