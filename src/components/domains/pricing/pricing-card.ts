import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common'

/** 주기가 없는 카드도 가격 블록 높이를 같게 유지해 버튼 줄이 맞도록 비운 줄을 채운다. */
const NO_BREAK_SPACE = '\u00a0'

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
  `
  @property({ type: String }) plan = ''
  @property({ type: String }) description = ''
  @property({ type: String }) price = ''
  @property({ type: String }) period = ''
  @property({ attribute: false }) features: string[] = []

  render() {
    return html`
      <div>
        <mm-text as="h2" size="18" weight="bold">${this.plan}</mm-text>
        <mm-paragraph>${this.description}</mm-paragraph>
      </div>
      <div>
        <mm-text size="24" weight="bold">${this.price}</mm-text>
        <mm-text size="12" color="light">${this.period || NO_BREAK_SPACE}</mm-text>
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
