import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import '@/components/flex/flex'

type Direction = 'row' | 'column'

@customElement('mm-meta-item-group')
export class MetaItemGroup extends LitElement {
  @property({ type: String }) direction: Direction = 'row'
  @property({ type: String }) gap = '4'
  @property({ type: String }) wrap: 'nowrap' | 'wrap' | 'wrap-reverse' = 'nowrap'

  render() {
    return html`
      <mm-flex direction=${this.direction} gap=${this.gap} wrap=${this.wrap} role="group">
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
