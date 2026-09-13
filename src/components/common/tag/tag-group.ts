import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('mm-tag-group')
export class TagGroup extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-1);
    }
  `

  render() {
    return html`
      <slot></slot>
    `
  }
}
