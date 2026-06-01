import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { Tag } from '../tag'
import { categoryToneMap, type Category, type TagTone } from '../tag.styles'

@customElement('mm-category-tag')
export class CategoryTag extends Tag {
  @property({ type: String }) category: Category = 'design'

  protected override get toneMapping(): { watchProp: string; toneMap: Record<string, TagTone> } {
    return { watchProp: 'category', toneMap: categoryToneMap }
  }

  protected override renderDefaultSlot() {
    return html`<slot>${this.category}</slot>`
  }
}

export default CategoryTag
