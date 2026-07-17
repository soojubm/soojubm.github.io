import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('mm-component-related')
export class ComponentRelated extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .component-related {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
      padding: var(--space-section) 0;
    }
  `

  render() {
    return html`
      <section class="component-related">
        <mm-heading level="2">Related Components</mm-heading>
        <slot></slot>
      </section>
    `
  }
}

export default ComponentRelated
