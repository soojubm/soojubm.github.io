import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'
import { linkStyles } from '@/components/link/link.styles'

@customElement('mm-link')
class Link extends LitElement {
  static styles = [linkStyles]

  @property({ type: String }) href = ''
  @property({ type: String }) target = ''
  @property({ type: Boolean }) external = false

  render() {
    const tempTarget = this.external ? '_blank' : '_self'
    return html`
      <a
        class="link"
        href="${this.href}"
        target="${tempTarget}"
        rel=${this.external ? 'noopener noreferrer' : nothing}
      >
        <slot></slot>
        ${this.external
          ? html`
              <mm-icon name=${ICON_NAMES.LINK}></mm-icon>
            `
          : nothing}
      </a>
    `
  }
}

export default Link
