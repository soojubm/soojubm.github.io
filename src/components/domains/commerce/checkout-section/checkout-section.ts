import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common/text/semantics/text-block'

@customElement('fff-checkout-section')
export class CheckoutSection extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
    }
  `
  @property({ type: String }) heading = ''

  render() {
    return html`
      <fff-text-block level="3" heading=${this.heading}></fff-text-block>
      <slot></slot>
    `
  }
}
