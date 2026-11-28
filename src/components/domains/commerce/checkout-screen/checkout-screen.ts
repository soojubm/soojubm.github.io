import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('fff-checkout-screen')
export class CheckoutScreen extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-6);
    }
  `

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'region')
  }

  render() {
    return html`
      <slot></slot>
    `
  }
}
