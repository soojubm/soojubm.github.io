import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { topBarStyles } from './top-bar.styles'

@customElement('mm-top-bar')
class TopBar extends LitElement {
  @property({ type: String }) variant = ''
  @property({ type: String }) label = ''
  /** 'back' | 'close' | '' */
  @property({ type: String }) nav: 'back' | 'close' | '' = 'back'

  static styles = [topBarStyles]

  render() {
    return html`
      <header role="navigation" class="top-bar" data-variant="${this.variant}">
        ${this.nav === 'back'
          ? html`<mm-icon-button variant="navigator" icon="arrow-left"></mm-icon-button>`
          : ''}
        <mm-text size="18" class="top-bar-title">${this.label}</mm-text>
        <slot name="action"></slot>
        ${this.nav === 'close'
          ? html`<mm-icon-button variant="navigator" icon="xmark"></mm-icon-button>`
          : ''}
      </header>
    `
  }
}

export default TopBar
