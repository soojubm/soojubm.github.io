import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('mm-component-related')
export class ComponentRelated extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .component-related {
      display: flex;
      flex-direction: column;
      padding: var(--space-section) 0;
      gap: var(--space-3);
    }
  `

  @property({ type: String }) heading = 'Related Components'

  render() {
    return html`
      <section class="component-related">
        <mm-paragraph size="large">${this.heading}</mm-paragraph>
        <slot></slot>
      </section>
    `
  }
}

export default ComponentRelated
