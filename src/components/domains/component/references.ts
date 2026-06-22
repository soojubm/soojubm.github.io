import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('mm-component-references')
export class ComponentReferences extends LitElement {
  @property({ type: String }) heading = 'References'

  static styles = css`
    :host {
      display: block;
    }

    .component-references {
      display: flex;
      flex-direction: column;
      padding: 4rem 0;
      gap: var(--space-3);
      /* border-top: 2px dashed var(--color-border); */
    }
  `

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
