// category-tag.ts

import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import './tag'

import { categoryToneMap, type Category } from './tag.styles'

@customElement('mm-category-tag')
export class CategoryTag extends LitElement {
  /**
   * domain semantic layer
   */

  @property({ type: String })
  category: Category = 'design'

  @property({ type: String })
  datetime?: string

  render() {
    const tone = categoryToneMap[this.category]

    return html`
      <mm-tag tone=${tone} .datetime=${this.datetime}>
        <slot name="icon" slot="icon"></slot>

        <slot> ${this.category} </slot>
      </mm-tag>
    `
  }
}

export default CategoryTag
