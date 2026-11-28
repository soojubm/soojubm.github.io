import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common'

/** 주기가 없는 카드도 가격 블록 높이를 같게 유지해 버튼 줄이 맞도록 비운 줄을 채운다. */
const NO_BREAK_SPACE = '\u00a0'

@customElement('fff-pricing-card')
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
        <fff-text as="h2" size="18" weight="bold">${this.plan}</fff-text>
        <fff-paragraph>${this.description}</fff-paragraph>
      </div>
      <div>
        <fff-text size="24" weight="bold">${this.price}</fff-text>
        <fff-text size="12" color="light">${this.period || NO_BREAK_SPACE}</fff-text>
      </div>
      <slot name="action"></slot>
      ${this.renderFeatures()}
      <slot name="badge"></slot>
    `
  }

  private renderFeatures() {
    if (!this.features.length) return nothing

    return html`
      <fff-text-list .texts=${this.features}></fff-text-list>
    `
  }
}
