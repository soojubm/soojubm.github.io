import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('mm-form')
export class Form extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
    }
  `

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'form')
  }

  render() {
    return html`
      <slot></slot>
    `
  }
}
