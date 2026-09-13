import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('mm-paragraph-group')
export class ParagraphGroup extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
    }
  `

  render() {
    return html`
      <slot></slot>
    `
  }
}
