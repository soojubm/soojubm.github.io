import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { MEDIA } from '@/constants'

import '@/components/domains/commerce/order-product-item'
import '@/components/domains/commerce/product-price'

@customElement('fff-product-purchase-bar')
export class ProductPurchaseBar extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      gap: var(--space-4);
      padding: var(--space-3) var(--layout-padding-inline);
      border-top: var(--material-chrome-border);
      background: var(--material-chrome-background-color);
      box-shadow: var(--material-chrome-shadow);
      backdrop-filter: var(--material-chrome-backdrop-filter);
      -webkit-backdrop-filter: var(--material-chrome-backdrop-filter);
    }

    /* 상품 요약이 남는 폭을 가져가 가격을 구매 버튼 곁으로 민다. */
    fff-order-product-item {
      flex: 1;
      min-width: 0;
    }

    /* 좁은 폭에서는 상품 요약이 한 줄을 차지하고, 가격과 구매 버튼이 아래 줄을 나눈다. */
    @media ${MEDIA.narrow} {
      :host {
        flex-wrap: wrap;
      }

      fff-order-product-item {
        flex-basis: 100%;
      }

      fff-product-price {
        flex: 1;
      }
    }
  `
  @property({ type: String }) name = ''
  @property({ type: String }) option = ''
  @property({ type: String, attribute: 'image-src' }) imageSrc = ''
  @property({ type: String }) price = ''
  @property({ type: String, attribute: 'original-price' }) originalPrice = ''
  @property({ type: String }) discount = ''

  render() {
    return html`
      <fff-order-product-item
        image-src=${this.imageSrc}
        name=${this.name}
        option=${this.option}
      ></fff-order-product-item>
      <fff-product-price
        size="large"
        price=${this.price}
        original-price=${this.originalPrice}
        discount=${this.discount}
      ></fff-product-price>
      <slot name="action"></slot>
    `
  }
}
