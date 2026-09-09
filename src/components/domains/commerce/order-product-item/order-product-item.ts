import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common/list-item/list-item'
import '@/components/common/text/text'

/**
 * mm-order-product-item
 * 장바구니·주문서·주문완료가 공유하는 주문 상품 한 줄.
 * 상품 이미지와 이름, 선택한 옵션, 가격을 같은 위계로 보여준다.
 */
@customElement('mm-order-product-item')
export class OrderProductItem extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `

  @property({ type: String }) name = ''
  @property({ type: String }) option = ''
  @property({ type: String }) price = ''
  @property({ type: String, attribute: 'image-src' }) imageSrc = ''

  render() {
    return html`
      <mm-list-item
        size="48"
        label=${this.name}
        description=${this.option}
        avatar-src=${this.imageSrc}
      >
        ${this.renderPrice()}
      </mm-list-item>
    `
  }

  private renderPrice() {
    if (!this.price) return nothing

    return html`
      <mm-text slot="trailing" size="18">${this.price}</mm-text>
    `
  }
}
