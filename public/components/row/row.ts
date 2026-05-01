import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { rowStyles } from './row.styles'

@customElement('mm-row')
class Row extends LitElement {
  @property({ type: String }) gap = ''
  @property({ type: String, attribute: 'justifyContent' }) justifyContent = ''

  static styles = [rowStyles]

  render() {
    return html`
      <div class="row" data-gap="${this.gap}" data-justify-content="${this.justifyContent}">
        <slot></slot>
      </div>
    `
  }
}

export default Row
