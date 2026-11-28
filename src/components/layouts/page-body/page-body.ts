import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('fff-page-body')
export class PageBody extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-8);
    }
  `

  render() {
    return html`
      <slot></slot>
    `
  }
}
