import { LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { IconName } from '@/components/common/icon/icon-names'

import '@/components/common/tag/tag'
import { categoryToneOf } from '@/components/common/tag/tag.styles'
import { renderTag } from '@/components/common/tag/tag.utils'

@customElement('mm-category-tag')
export class CategoryTag extends LitElement {
  @property({ type: Number }) category = 1
  @property({ type: String }) icon?: IconName

  render() {
    return renderTag(categoryToneOf(this.category), this.icon)
  }
}
