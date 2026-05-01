import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { mediaStyles } from './media.styles'

@customElement('mm-media')
class Media extends LitElement {
  @property({ type: String }) size = ''
  @property({ type: String }) src = ''
  @property({ type: String }) alt = ''

  static styles = [mediaStyles]

  render() {
    return html`
      <div data-size="${this.size}">
        <img src="${this.src}" alt="${this.alt}" />
      </div>
    `
  }
}

export default Media
