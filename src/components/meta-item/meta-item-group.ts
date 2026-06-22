import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import '../flex/flex'

type Direction = 'row' | 'column'

@customElement('mm-meta-item-group')
export class MetaItemGroup extends LitElement {
  @property({ type: String }) direction: Direction = 'row'
  @property({ type: String }) gap = '4'

  render() {
    return html`
      <mm-flex
        direction=${this.direction}
        gap=${this.gap}
        ?wrap=${this.direction === 'row'}
        role="group"
      >
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
