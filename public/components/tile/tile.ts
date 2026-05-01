import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { tileStyles } from './tile.styles'

@customElement('mm-tile')
class Tile extends LitElement {
  static styles = [tileStyles]

  @property({ type: String }) variant = ''
  @property({ type: String }) size = ''
  @property({ type: String }) height = ''

  render() {
    const ile = this.height ? `--tile-height:${this.height};` : ''
    return html`
      <div class="" data-variant="${this.variant}" data-size="${this.size}" style="${inlineStyle}">
        <slot name="category"></slot>
        <slot name="action"></slot>
        <slot></slot>
      </div>
    `
  }
}

export default Tile
