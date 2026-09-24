import { LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { IconName } from '@/components/common/icon/icon-names'
import type { CategoryTone } from '@/components/common/tag/tag.styles'

import '@/components/common/tag/tag'
import { renderTag } from '@/components/common/tag/tag.utils'

@customElement('mm-category-tag')
export class CategoryTag extends LitElement {
  @property({ type: String }) tone: CategoryTone = 'pink'
  @property({ type: String }) icon?: IconName

  render() {
    return renderTag(this.tone, this.icon)
  }
}
