import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { MetaItemData } from '@/components/common/meta-item/meta-item'

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
      <fff-meta-item-group direction="column" gap="1" .items=${this.items}></fff-meta-item-group>
    `
  }

  private get items(): MetaItemData[] {
    const shipping = this.shipping ? [{ label: '배송료', value: this.shipping }] : []
    const discount = this.discount ? [{ label: '쿠폰 할인', value: this.discount }] : []

    return [
      { label: '총 상품금액', value: this.subtotal },
      ...shipping,
      ...discount,
      { label: '최종 결제 금액', value: this.total, valueSize: 'large' },
    ]
  }
}
