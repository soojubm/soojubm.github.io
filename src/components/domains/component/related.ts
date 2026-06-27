import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import '@/components/flex/flex'

@customElement('mm-component-related')
export class ComponentRelated extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .component-related {
      padding: var(--space-section) 0;
    }
  `

  @property({ type: String }) heading = 'Related Components'

  render() {
    return html`
      <mm-flex as="section" class="component-related" direction="column" gap="3">
        <mm-paragraph size="large">${this.heading}</mm-paragraph>
        <slot></slot>
      </mm-flex>
    `
  }
}

export default ComponentRelated
