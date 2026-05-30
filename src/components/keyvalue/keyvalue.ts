import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { keyvalueStyles } from './keyvalue.styles'

@customElement('mm-keyvalue')
class Keyvalue extends LitElement {
  @property({ type: String }) key = ''
  @property({ type: String }) value = ''
  @property({ type: String }) size = ''
  @property({ type: String }) alignment = ''

  static styles = [keyvalueStyles]

  render() {
    return html`
      <div class="summary-item" data-size="${this.size}" data-alignment="${this.alignment}">
        <mm-text size="14" color="var(--color-foreground-light)">${this.key}</mm-text>
        ${this.size === 'large'
          ? html`<mm-text size="18">${this.value}</mm-text>`
          : html`<mm-text size="14" weight="bold">${this.value}</mm-text>`}
        <slot name="slot"></slot>
      </div>
    `
  }
}

export default Keyvalue
