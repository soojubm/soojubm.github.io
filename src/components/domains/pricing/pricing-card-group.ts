import { LitElement, css, html } from 'lit'
import { customElement, queryAssignedElements } from 'lit/decorators.js'

import '@/components/domains/pricing/pricing-card'

/**
 * 비교할 요금제 카드 목록. 카드를 같은 너비의 열로 나란히 놓고, 목록 role과 간격을 소유한다.
 * 좁은 화면에서는 한 열로 쌓인다.
 */
@customElement('mm-pricing-card-group')
export class PricingCardGroup extends LitElement {
  static styles = css`
    :host {
      display: grid;
      width: 100%;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
      gap: var(--space-6);
    }
  `
  @queryAssignedElements({ flatten: true }) private items!: HTMLElement[]

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'list')
  }

  render() {
    return html`
      <slot @slotchange=${this.handleSlotChange}></slot>
    `
  }

  private handleSlotChange() {
    this.items.forEach(item => item.setAttribute('role', 'listitem'))
  }
}
