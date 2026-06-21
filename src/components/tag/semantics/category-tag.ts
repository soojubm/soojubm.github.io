import { LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { IconName } from '../../icon-button/semantics/icon-names'
import { renderMappedTag } from '../tag'
import { categoryToneMap, type Category } from '../tag.styles'

@customElement('mm-category-tag')
export class CategoryTag extends LitElement {
  @property({ type: String }) category: Category = 'design'
  @property({ type: String }) icon?: IconName

  render() {
    return renderMappedTag(this.category, categoryToneMap, this.icon)
  }
}

export default CategoryTag
