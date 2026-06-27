import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '@/stylesheets/shared/reset.styles'

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
      <mm-flex>
        ${this.originalPrice
          ? html`
              <del>
                <mm-text size="18" color="light">${this.originalPrice}</mm-text>
              </del>
            `
          : nothing}
        ${this.discount
          ? html`
              <mm-text size="18">(${this.discount})</mm-text>
            `
          : nothing}
      </mm-flex>
      <mm-text size="24" weight="bold">${this.price}</mm-text>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-product-price': ProductPrice
  }
}
