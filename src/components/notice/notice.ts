import { LitElement, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { ICON_NAMES } from '../icon-button/semantics/icon-names'
import { noticeStyles } from './notice.styles'

const VARIANT_ICONS: Record<string, string> = {
  success: ICON_NAMES.SUCCESS,
  warning: ICON_NAMES.WARNING,
  danger: ICON_NAMES.DANGER,
}

@customElement('mm-notice')
class Notice extends LitElement {
  @property({ type: String }) heading = ''
  @property({ type: String }) text = ''
  @property({ type: String }) variant = ''
  @property({ type: Boolean }) dismissible = false

  @state() private dismissed = false

  static styles = [noticeStyles]

  private get icon() {
    return VARIANT_ICONS[this.variant] ?? ICON_NAMES.INFO
  }

  private dismiss() {
    this.dismissed = true
    this.dispatchEvent(new CustomEvent('mm-dismiss', { bubbles: true, composed: true }))
  }

  render() {
    if (this.dismissed) return html``

    return html`
      <div class="notice" data-variant="${this.variant}">
        <mm-icon name=${this.icon} class="notice-icon"></mm-icon>
        ${this.heading
          ? html`
              <h3>${this.heading}</h3>
            `
          : ''}
        ${this.text
          ? html`
              <mm-text size="14">${this.text}</mm-text>
            `
          : ''}
        <slot></slot>
        ${this.dismissible
          ? html`
              <mm-clear-button class="notice-dismiss" @click=${this.dismiss}></mm-clear-button>
            `
          : ''}
      </div>
    `
  }
}

export default Notice
