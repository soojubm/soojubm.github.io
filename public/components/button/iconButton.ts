import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { buttonStyles } from './button.styles'

// aria label

@customElement('mm-icon-button')
class IconButton extends LitElement {
  @property({ type: String }) icon = ''
  @property({ type: String }) variant = ''
  @property({ type: String }) size = ''
  @property({ type: String }) color = ''
  @property({ type: String }) label = ''
  @property({ type: String }) tooltip = ''
  @property({ type: Boolean, reflect: true }) disabled = false

  static styles = [buttonStyles]

  render() {
    return html`
      <button
        class="icon-button"
        data-variant="${this.variant}"
        data-size="${this.size}"
        aria-label="${this.label || this.tooltip}"
        ?disabled="${this.disabled}"
      >
        <mm-icon name="${this.icon}" color="${this.color}"></mm-icon>
      </button>
    `
  }
}

export default IconButton
