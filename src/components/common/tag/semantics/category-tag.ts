import { LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { IconName } from '@/components/common/icon/icon-names'

import '@/components/common/tag/tag'
import { categoryToneMap, type Category } from '@/components/common/tag/tag.styles'
import { renderTag } from '@/components/common/tag/tag.utils'

@customElement('mm-category-tag')
export class CategoryTag extends LitElement {
  @property({ type: String }) category: Category = 'design'
  @property({ type: String }) icon?: IconName

  render() {
    const tone = categoryToneMap[this.category] ?? 'default'
    return renderTag(tone, this.icon, this.category)
  }
}
