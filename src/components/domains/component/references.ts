import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import '@/components/flex/flex'

@customElement('mm-component-references')
export class ComponentReferences extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .component-references {
      padding: var(--space-section) 0;
    }
  `

  @property({ type: String }) heading = 'References'

  render() {
    return html`
      <mm-flex as="section" class="component-references" direction="column" gap="2">
        <mm-paragraph size="large">${this.heading}</mm-paragraph>
        <slot></slot>
      </mm-flex>
    `
  }
}

export default ComponentReferences
