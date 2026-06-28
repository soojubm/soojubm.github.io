import { LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { IconName } from '@/components/icon-button/semantics/icon-names'
import type { TagTone } from '@/components/tag/tag.styles'

import { renderTag } from '@/components/tag/tag'

@customElement('mm-accent-tag')
export class AccentTag extends LitElement {
  @property({ type: String, reflect: true }) tone: TagTone = 'gold'
  @property({ type: String }) icon?: IconName

  render() {
    return renderTag(this.tone, undefined, this.icon)
  }
}

export default AccentTag
