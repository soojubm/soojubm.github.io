import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('mm-component-guide')
class ComponentGuide extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
      padding: 2.5rem 0;
    }
  `

  render() {
    return html`<slot></slot>`
  }
}

export default ComponentGuide
