import { LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { IconName } from '@/components/common/icon/icon-names'

import '@/components/common/tag/tag'
import { renderTag } from '@/components/common/tag/tag.utils'

@customElement('fff-accent-tag')
export class AccentTag extends LitElement {
  @property({ type: String }) icon?: IconName

  render() {
    return renderTag('gold', this.icon)
  }
}
