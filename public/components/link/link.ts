import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { linkStyles } from './link.styles'

@customElement('mm-link')
class Link extends LitElement {
  @property({ type: String }) href = ''
  @property({ type: String }) target = '_blank'
  @property({ type: String }) variant = 'primary'
  @property({ type: String, attribute: 'isExternal' }) isExternal = 'false'

  static styles = [linkStyles]

  render() {
    const external = this.isExternal === 'true'

    return html`
      <a
        class=""
        href="${this.href}"
        target="${this.target}"
        data-variant="${this.variant}"
        rel="${external ? 'noopener noreferrer' : ''}"
      >
        <slot></slot>
        ${external ? html`<mm-icon name="arrow-up-right" size="tiny"></mm-icon>` : ''}
      </a>
    `
  }
}

export default Link
