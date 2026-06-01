import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { Tag } from '../tag'
import { statusToneMap, type StatusVariant, type TagTone } from '../tag.styles'

@customElement('mm-status-tag')
export class StatusTag extends Tag {
  @property({ type: String }) variant: StatusVariant = 'neutral'

  protected override get toneMapping(): { watchProp: string; toneMap: Record<string, TagTone> } {
    return { watchProp: 'variant', toneMap: statusToneMap }
  }

  protected override renderDefaultSlot() {
    return html`<slot>${this.variant}</slot>`
  }
}

export default StatusTag
