import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('mm-tile')
class Tile extends LitElement {
  @property({ type: String }) variant = ''
  @property({ type: String }) size = ''
  @property({ type: String }) height = ''

  render() {
    const inlineStyle = this.height ? `--tile-height:${this.height};` : ''
    return html`
      <link rel="stylesheet" href="/public/components/tile/tile.css" />
      <div class="tile" data-variant="${this.variant}" data-size="${this.size}" style="${inlineStyle}">
        <slot name="category"></slot>
        <slot name="action"></slot>
        <slot></slot>
      </div>
    `
  }
}

export default Tile
