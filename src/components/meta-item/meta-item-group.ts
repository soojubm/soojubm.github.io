import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import '../flex/flex'

@customElement('mm-meta-item-group')
export class MetaItemGroup extends LitElement {
  @property({ type: String }) gap = '4'

  render() {
    return html`
      <mm-flex gap=${this.gap} wrap role="group">
        <slot></slot>
      </mm-flex>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-meta-item-group': MetaItemGroup
  }
}
