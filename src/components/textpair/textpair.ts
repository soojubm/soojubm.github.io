import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { textpairStyles } from './textpair.styles'

@customElement('mm-text-pair')
class TextPair extends LitElement {
  @property({ type: String, attribute: 'labelText' }) labelText = ''
  @property({ type: String, attribute: 'descriptionText' }) descriptionText = ''

  static styles = [textpairStyles]

  render() {
    return html`
      <div class="summary-item">
        <mm-text variant="heading4">${this.labelText}</mm-text>
        <mm-text variant="label">${this.descriptionText}</mm-text>
      </div>
    `
  }
}

export default TextPair
