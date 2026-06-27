import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('mm-component-references')
export class ComponentReferences extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .component-references {
      display: flex;
      flex-direction: column;
      padding: var(--space-section) 0;
      gap: var(--space-2);
    }
  `

  @property({ type: String }) heading = 'References'

  render() {
    return html`
      <section class="component-references">
        <mm-paragraph size="large">${this.heading}</mm-paragraph>
        <slot></slot>
      </section>
    `
  }
}

export default ComponentReferences
