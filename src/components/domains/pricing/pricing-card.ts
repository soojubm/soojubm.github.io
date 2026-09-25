import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common'

/**
 * 요금제 하나를 담는 카드. 요금제 이름과 설명, 결제 주기당 가격, 포함 혜택을 한 장에 보여준다.
 * 배지는 badge 슬롯으로, 가입·업그레이드 버튼은 action 슬롯으로 받아 표기와 동작을 소비자가 정한다.
 */
@customElement('mm-pricing-card')
export class PricingCard extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
      position: relative;
    }

    /* 배지는 흐름에서 빼 카드 우측 상단에 둔다. 배지 유무와 관계없이 카드끼리 제목 줄이 맞는다. */
    ::slotted([slot='badge']) {
      position: absolute;
      top: 0;
      right: 0;
    }

    .price {
      display: flex;
      align-items: baseline;
      flex-wrap: wrap;
      gap: var(--space-1);
    }
  `
  @property({ type: String }) plan = ''
  @property({ type: String }) description = ''
  @property({ type: String }) price = ''
  @property({ type: String }) period = ''
  @property({ attribute: false }) features: string[] = []

  render() {
    return html`
      <mm-text-block level="3" heading=${this.plan} description=${this.description}></mm-text-block>
      <div class="price">
        <mm-text size="32" weight="bold">${this.price}</mm-text>
        <mm-text color="light">${this.period}</mm-text>
      </div>
      <slot name="action"></slot>
      ${this.renderFeatures()}
      <slot name="badge"></slot>
    `
  }

  private renderFeatures() {
    if (!this.features.length) return nothing

    return html`
      <mm-text-list .texts=${this.features}></mm-text-list>
    `
  }
}
