import { LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { IconName } from '@/components/icon-button/semantics/icon-names'
import { renderMappedTag } from '@/components/tag/tag'
import { statusToneMap, type StatusVariant } from '@/components/tag/tag.styles'

@customElement('mm-status-tag')
export class StatusTag extends LitElement {
  @property({ type: String }) variant: StatusVariant = 'neutral'
  @property({ type: String }) icon?: IconName

  render() {
    return renderMappedTag(this.variant, statusToneMap, this.icon)
  }
}

export default StatusTag
