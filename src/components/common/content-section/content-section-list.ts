import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('fff-content-section-list')
export class ContentSectionList extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-section);
    }

    :host([size='small']) {
      gap: var(--space-subsection);
    }
  `

  @property({ type: String, reflect: true }) size?: 'small'

  render() {
    return html`
      <slot></slot>
    `
  }
}
