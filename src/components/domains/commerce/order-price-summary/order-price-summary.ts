import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common'

@customElement('fff-order-price-summary')
export class OrderPriceSummary extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `
  @property({ type: String }) subtotal = ''
  @property({ type: String }) shipping?: string
  @property({ type: String }) discount?: string
  @property({ type: String }) total = ''

  render() {
    return html`
      <fff-meta-item-group direction="column" gap="1">
        <fff-meta-item label="총 상품금액" value=${this.subtotal}></fff-meta-item>
        ${this.renderShipping()}${this.renderDiscount()}
        <fff-meta-item
          label="최종 결제 금액"
          value=${this.total}
          value-size="large"
        ></fff-meta-item>
      </fff-meta-item-group>
    `
  }

  private renderShipping() {
    if (!this.shipping) return nothing

    return html`
      <fff-meta-item label="배송료" value=${this.shipping}></fff-meta-item>
    `
  }

  private renderDiscount() {
    if (!this.discount) return nothing

    return html`
      <fff-meta-item label="쿠폰 할인" value=${this.discount}></fff-meta-item>
    `
  }
}
