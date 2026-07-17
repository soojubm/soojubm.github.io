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
      gap: var(--space-2);
      padding: var(--space-section) 0;
    }
  `

  @property({ type: String }) heading = 'References'

  render() {
    return html`
      <mm-surface variant="filled" radius="large" style="padding-inline: 1.25rem">
        <!-- <mm-heading >${this.heading}</mm-heading> -->
        <mm-flex gap="4" wrap="wrap" style="row-gap:var(--space-1)"><slot></slot></mm-flex>
      </mm-surface>
    `
  }
}

export default ComponentReferences
