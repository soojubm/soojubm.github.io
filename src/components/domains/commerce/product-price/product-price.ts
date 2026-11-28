import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { paragraphSizeToTextSize, type ParagraphSize } from '@/components/common/text/text.styles'
import '@/components/common'

@customElement('fff-product-price')
export class ProductPrice extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      gap: 0 var(--space-2);
      white-space: nowrap;
    }

    del {
      text-decoration: line-through;
    }

    ins {
      text-decoration: none;
    }
  `
  @property({ type: String }) size: ParagraphSize = 'medium'
  @property({ type: String }) price = ''
  @property({ type: String, attribute: 'original-price' }) originalPrice = ''
  @property({ type: String }) discount = ''

  render() {
    return html`
      ${this.renderOriginalPrice()}${this.renderPrice()}${this.renderDiscount()}
    `
  }

  private get textSize() {
    return paragraphSizeToTextSize[this.size]
  }

  private renderOriginalPrice() {
    if (!this.originalPrice) return nothing

    return html`
      <del>
        <fff-text size=${this.textSize} color="light">${this.originalPrice}</fff-text>
      </del>
    `
  }

  private renderPrice() {
    if (!this.originalPrice) {
      return html`
        <fff-text size=${this.textSize} weight="bold">${this.price}</fff-text>
      `
    }

    return html`
      <ins>
        <fff-text size=${this.textSize} weight="bold">${this.price}</fff-text>
      </ins>
    `
  }

  private renderDiscount() {
    if (!this.discount) return nothing

    return html`
      <fff-text size=${this.textSize}>(${this.discount})</fff-text>
    `
  }
}
