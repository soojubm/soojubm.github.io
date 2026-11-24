import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common'
import '@/components/domains/commerce/product-price'

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
        size="large"
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
      <mm-product-price slot="trailing" size="large" price=${this.price}></mm-product-price>
    `
  }
}
