import { LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { IconName } from '@/components/icon-button/semantics/icon-names'

import '@/components/tag/tag'
import { statusToneMap, type StatusVariant } from '@/components/tag/tag.styles'
import { renderTag } from '@/components/tag/tag.utils'

@customElement('mm-status-tag')
export class StatusTag extends LitElement {
  @property({ type: String }) variant: StatusVariant = 'neutral'
  @property({ type: String }) icon?: IconName

  render() {
    const tone = statusToneMap[this.variant] ?? 'default'
    return renderTag(tone, this.icon, this.variant)
  }
}

export default StatusTag
