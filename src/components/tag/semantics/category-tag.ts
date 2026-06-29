import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { IconName } from '@/components/icon-button/semantics/icon-names'

import '@/components/tag/tag'
import { categoryToneMap, type Category } from '@/components/tag/tag.styles'

@customElement('mm-category-tag')
export class CategoryTag extends LitElement {
  @property({ type: String }) category: Category = 'design'
  @property({ type: String }) icon?: IconName

  render() {
    const tone = categoryToneMap[this.category] ?? 'default'

    return html`
      <mm-tag tone=${tone} icon=${ifDefined(this.icon)}>
        <slot>${this.category}</slot>
      </mm-tag>
    `
  }
}

export default CategoryTag
