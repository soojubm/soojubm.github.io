import { LitElement, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'
import { noticeStyles } from '@/components/notice/notice.styles'
import { emit } from '@/utils/emit'
import '@/components/flex/flex'

const VARIANT_ICONS: Record<string, string> = {
  success: ICON_NAMES.SUCCESS,
  warning: ICON_NAMES.WARNING,
  danger: ICON_NAMES.DANGER,
}

@customElement('mm-notice')
class Notice extends LitElement {
  static styles = [noticeStyles]

  @property({ type: String }) heading = ''
  @property({ type: String }) description = ''
  @property({ type: String, reflect: true }) variant = ''
  @property({ type: Boolean }) dismissible = false

  @state() private dismissed = false

  render() {
    if (this.dismissed) return html``

    return html`
      <mm-flex class="notice" direction="column" gap="2" align-items="start">
        <mm-icon name=${this.icon} class="notice-icon"></mm-icon>
        ${this.heading
          ? html`
              <div class="notice-heading">
                <mm-heading level="3">${this.heading}</mm-heading>
              </div>
            `
          : ''}
        ${this.description
          ? html`
              <mm-paragraph>${this.description}</mm-paragraph>
            `
          : ''}
        <slot></slot>
        ${this.dismissible
          ? html`
              <div class="notice-dismiss">
                <mm-dismiss-button @click=${this.dismiss}></mm-dismiss-button>
              </div>
            `
          : ''}
      </mm-flex>
    `
  }

  private get icon() {
    return VARIANT_ICONS[this.variant] ?? ICON_NAMES.INFO
  }

  private dismiss() {
    this.dismissed = true
    emit(this, 'mm-dismiss')
  }
}

export default Notice
