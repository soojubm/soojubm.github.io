import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { menuItemStyles } from './menuitem.styles'

@customElement('mm-menuitem')
class MenuItem extends LitElement {
  @property({ type: String }) alignment = ''
  @property({ type: String }) href = '#'
  @property({ type: String }) icon = ''
  @property({ type: String }) tone = ''
  @property({ type: String }) description = ''
  @property({ type: String }) label = ''
  @property({ type: String }) current = ''

  static styles = [menuItemStyles]

  render() {
    return html`
      <a
        href="${this.href}"
        class="item"
        role="menuitem"
        data-alignment="${this.alignment}"
        data-tone="${this.tone}"
        aria-current="${this.current}"
      >
        ${this.icon ? html`<mm-avatar variant="tertiary" icon="${this.icon}"></mm-avatar>` : ''}
        <slot name="prefix"></slot>
        <mm-text variant="body">${this.label}</mm-text>
        <mm-text variant="label">${this.description}</mm-text>
        <slot name="action"></slot>
      </a>
    `
  }
}

export default MenuItem
