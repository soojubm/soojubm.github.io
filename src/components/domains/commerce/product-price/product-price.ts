import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { paragraphSizeToTextSize, type ParagraphSize } from '@/components/common/text/text.styles'
import '@/components/common'

/**
 * mm-product-price
 * 상품 가격 표시. 정가(취소선)·판매가·할인 표기를 한 줄로 보여준다.
 * size는 mm-paragraph의 size와 동일한 의미를 갖는다.
 */
@customElement('mm-product-price')
export class ProductPrice extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: baseline;
      gap: var(--space-2);
    }

    del {
      text-decoration: line-through;
    }

    ins {
      text-decoration: none;
    }
  `

  @property({ type: String, reflect: true }) size: ParagraphSize = 'medium'
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
        <mm-text size=${this.textSize} color="light">${this.originalPrice}</mm-text>
      </del>
    `
  }

  private renderPrice() {
    if (!this.originalPrice) {
      return html`
        <mm-text size=${this.textSize} weight="bold">${this.price}</mm-text>
      `
    }

    return html`
      <ins>
        <mm-text size=${this.textSize} weight="bold">${this.price}</mm-text>
      </ins>
    `
  }

  private renderDiscount() {
    if (!this.discount) return nothing

    return html`
      <mm-text size=${this.textSize}>(${this.discount})</mm-text>
    `
  }
}
