import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('fff-component-guide')
export class ComponentGuide extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-section);
      margin-top: var(--space-section);
    }
  `

  render() {
    return html`
      <slot></slot>
    `
  }
}
