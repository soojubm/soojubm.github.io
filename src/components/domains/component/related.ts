import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('mm-component-related')
export class ComponentRelated extends LitElement {
  @property({ type: String }) heading = 'Related Components'

  static styles = css`
    :host {
      display: block;
    }

    .component-related {
      display: flex;
      flex-direction: column;
      padding: 4rem 0;
      gap: var(--space-3);
    }
  `

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
