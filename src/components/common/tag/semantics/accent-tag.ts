import { LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { IconName } from '@/components/common/icon/icon-names'
import type { TagTone } from '@/components/common/tag/tag.styles'

import '@/components/common/tag/tag'
import { renderTag } from '@/components/common/tag/tag.utils'

@customElement('mm-accent-tag')
export class AccentTag extends LitElement {
  @property({ type: String, reflect: true }) tone: TagTone = 'gold'
  @property({ type: String }) icon?: IconName

  render() {
    return renderTag(this.tone, this.icon)
  }
}

export default AccentTag
