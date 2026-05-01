import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('mm-text-pair')
class TextPair extends LitElement {
  @property({ type: String, attribute: 'labelText' }) labelText = ''
  @property({ type: String, attribute: 'descriptionText' }) descriptionText = ''

  render() {
    return html`
      <link rel="stylesheet" href="/public/components/textpair/textpair.css" />
      <div class="summary-item">
        <mm-text variant="heading4">${this.labelText}</mm-text>
        <mm-text variant="label">${this.descriptionText}</mm-text>
      </div>
    `
  }
}

export default TextPair
