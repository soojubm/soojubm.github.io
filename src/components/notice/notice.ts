import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { noticeStyles } from './notice.styles'

const VARIANT_ICONS: Record<string, string> = {
  success: 'check-circle',
  warning: 'warning-triangle',
  danger: 'error-circle',
}

@customElement('mm-notice')
class Notice extends LitElement {
  @property({ type: String }) heading = ''
  @property({ type: String }) text = ''
  @property({ type: String }) variant = ''

  static styles = [noticeStyles]

  private get icon() {
    return VARIANT_ICONS[this.variant] ?? 'info-circle'
  }

  render() {
    return html`
      <div class="notice" data-variant="${this.variant}">
        <mm-icon name=${this.icon} class="notice-icon"></mm-icon>
        ${this.heading ? html`<h3 class="notice-title">${this.heading}</h3>` : ''}
        ${this.text ? html`<mm-text size="14">${this.text}</mm-text>` : ''}
        <slot></slot>
      </div>
    `
  }
}

export default Notice
