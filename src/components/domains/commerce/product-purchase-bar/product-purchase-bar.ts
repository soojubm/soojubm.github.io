import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/domains/commerce/order-product-item'
import '@/components/domains/commerce/product-price'

/**
 * mm-product-purchase-bar
 * 상품 상세 하단에 고정되어 보고 있는 상품과 가격을 요약하고 구매 동작을 붙잡아 두는 막대.
 * 고정 위치는 mm-fixed-bottom이 맡고, 이 컴포넌트는 막대의 내용과 재질만 소유한다.
 * 구매 버튼은 action 슬롯으로 받는다. 버튼이 aria-controls로 장바구니 시트를 가리켜야 하는데,
 * id 참조는 shadow 경계를 넘지 못해 버튼이 페이지 쪽 light DOM에 있어야 하기 때문이다.
 */
@customElement('mm-product-purchase-bar')
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
    mm-order-product-item {
      flex: 1;
      min-width: 0;
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
      <mm-order-product-item
        image-src=${this.imageSrc}
        name=${this.name}
        option=${this.option}
      ></mm-order-product-item>
      <mm-product-price
        size="large"
        price=${this.price}
        original-price=${this.originalPrice}
        discount=${this.discount}
      ></mm-product-price>
      <slot name="action"></slot>
    `
  }
}
