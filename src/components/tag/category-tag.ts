import { html, type PropertyValues } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { Tag } from './tag'
import { categoryToneMap, type Category } from './tag.styles'

@customElement('mm-category-tag')
export class CategoryTag extends Tag {
  @property({ type: String }) category: Category = 'design'

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties)
    if (changedProperties.has('category')) {
      this.tone = categoryToneMap[this.category]
    }
  }

  protected override renderDefaultSlot() {
    return html`<slot>${this.category}</slot>`
  }
}

export default CategoryTag
