import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { resetStyles } from '@/stylesheets/shared.styles'
import '@/components/common/text'

/**
 * mm-product-price
 * 상품 가격 표시. 정가(취소선)·할인 표기·판매가를 prop으로 받아 한 줄로 보여준다.
 */
@customElement('mm-product-price')
export class ProductPrice extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
      }

      .original {
        display: flex;
        gap: var(--space-2);
      }

      del {
        text-decoration: line-through;
      }
    `,
  ]

  @property({ type: String }) price = ''
  @property({ type: String, attribute: 'original-price' }) originalPrice = ''
  @property({ type: String }) discount = ''

  render() {
    return html`
      <div class="original">${this.renderOriginalPrice()} ${this.renderDiscount()}</div>
      <mm-text size="24" weight="bold">${this.price}</mm-text>
    `
  }

  private renderOriginalPrice() {
    if (!this.originalPrice) return nothing

    return html`
      <del>
        <mm-text size="18" color="light">${this.originalPrice}</mm-text>
      </del>
    `
  }

  private renderDiscount() {
    if (!this.discount) return nothing

    return html`
      <mm-text size="18">(${this.discount})</mm-text>
    `
  }
}
