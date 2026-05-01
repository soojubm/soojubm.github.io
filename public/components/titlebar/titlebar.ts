import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { titlebarStyles } from './titlebar.styles'

@customElement('mm-titlebar')
class TitleBar extends LitElement {
  @property({ type: String }) variant = ''
  @property({ type: String }) label = ''
  @property({ type: Boolean, attribute: 'hiddenBack' }) hiddenBack = false

  static styles = [titlebarStyles]

  render() {
    return html`
      <header role="navigation" class="" data-variant="${this.variant}">
        ${!this.hiddenBack
          ? html`<mm-icon-button variant="navigator" icon="arrow-left"></mm-icon-button>`
          : ''}
        <mm-text variant="subhead" class="titlebar-title">${this.label}</mm-text>
        <slot name="action"></slot>
      </header>
    `
  }
}

export default TitleBar
