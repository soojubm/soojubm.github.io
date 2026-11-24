import { LitElement, css, html } from 'lit'
import { customElement, queryAssignedElements } from 'lit/decorators.js'

import '@/components/domains/pricing/pricing-card'

@customElement('mm-pricing-card-group')
export class PricingCardGroup extends LitElement {
  static styles = css`
    :host {
      display: grid;
      width: 100%;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
      gap: var(--space-8);
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
