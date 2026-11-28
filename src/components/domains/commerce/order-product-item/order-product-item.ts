import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common'
import '@/components/domains/commerce/product-price'

@customElement('fff-order-product-item')
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
      <fff-list-item
        size="large"
        label=${this.name}
        description=${this.option}
        .avatar=${{ variant: 'secondary', src: this.imageSrc }}
      >
        ${this.renderPrice()}
      </fff-list-item>
    `
  }

  private renderPrice() {
    if (!this.price) return nothing

    return html`
      <fff-product-price slot="trailing" size="large" price=${this.price}></fff-product-price>
    `
  }
}
