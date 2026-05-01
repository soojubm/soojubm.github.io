import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { iconStyles } from './icon.styles'

@customElement('mm-icon')
class Icon extends LitElement {
  @property({ type: String }) name = ''
  @property({ type: String }) size = ''
  @property({ type: String }) color = ''

  static styles = [iconStyles]

  render() {
    const iconClassName = this.name ? `iconoir-${this.name}` : ''

    return html`
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/iconoir-icons/iconoir@main/css/iconoir.css"
      />
      <i
        class="icon ${iconClassName}"
        data-size="${this.size}"
        style="${this.color ? `color: ${this.color}` : ''}"
      ></i>
    `
  }
}

export default Icon
