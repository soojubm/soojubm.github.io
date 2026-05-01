import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { keyvalueStyles } from './keyvalue.styles'

@customElement('mm-keyvalue')
class Keyvalue extends LitElement {
  static styles = [keyvalueStyles]

  @property({ type: String }) key = ''
  @property({ type: String }) value = ''
  @property({ type: String }) size = ''
  @property({ type: String }) alignment = ''

  render() {
    return html`
      <div class="summary-item" data-size="${this.size}" data-alignment="${this.alignment}">
        <mm-text variant="label">${this.key}</mm-text>
        <mm-text variant="${this.size === 'large' ? 'subhead' : 'heading4'}">${this.value}</mm-text>
        <slot name="slot"></slot>
      </div>
    `
  }
}

export default Keyvalue
