import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { noticeStyles } from './notice.styles'

@customElement('mm-notice')
class Notice extends LitElement {
  @property({ type: String }) heading = ''
  @property({ type: String }) text = ''
  @property({ type: String }) variant = ''

  static styles = [noticeStyles]

  render() {
    return html`
      <div class="notice" data-variant="${this.variant}">
        <mm-icon name="warning-triangle" class="notice-icon"></mm-icon>
        ${this.heading ? html`<h3 class="notice-title">${this.heading}</h3>` : ''}
        ${this.text ? html`<mm-text size="14">${this.text}</mm-text>` : ''}
        <slot></slot>
      </div>
    `
  }
}

export default Notice
