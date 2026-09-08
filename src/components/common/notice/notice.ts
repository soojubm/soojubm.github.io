import { LitElement, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/common/icon-button/semantics/icon-names'
import { noticeStyles } from '@/components/common/notice/notice.styles'
import { emit } from '@/utils'
import '@/components/common/icon'
import '@/components/common/text/semantics/text-block'
import '@/components/common/icon-button/semantics/dismiss-button'

const VARIANT_ICONS: Record<string, string> = {
  success: ICON_NAMES.SUCCESS,
  warning: ICON_NAMES.WARNING,
  danger: ICON_NAMES.DANGER,
}

@customElement('mm-notice')
class Notice extends LitElement {
  static styles = [noticeStyles]

  @property({ type: String, reflect: true }) role = 'note'
  @property({ type: String }) heading = ''
  @property({ type: String }) description = ''
  @property({ type: String, reflect: true }) variant = ''
  @property({ type: Boolean }) dismissible = false

  @state() private dismissed = false

  render() {
    if (this.dismissed) return html``

    return html`
      <mm-icon name=${this.icon} class="notice-icon"></mm-icon>
      ${this.renderTextBlock()}
      <slot></slot>
      ${this.renderDismissButton()}
    `
  }

  private renderTextBlock() {
    if (!this.heading && !this.description) return nothing

    return html`
      <mm-text-block
        level="4"
        heading=${this.heading}
        description=${this.description}
      ></mm-text-block>
    `
  }

  private renderDismissButton() {
    if (!this.dismissible) return nothing

    return html`
      <div class="notice-dismiss">
        <mm-dismiss-button @dismiss=${this.handleDismiss}></mm-dismiss-button>
      </div>
    `
  }

  private get icon() {
    return VARIANT_ICONS[this.variant] ?? ICON_NAMES.INFO
  }

  // 버튼의 dismiss는 여기서 멈추고, notice 자신의 dismiss로 바꿔 알린다.
  private handleDismiss(event: Event) {
    event.stopPropagation()

    this.dismissed = true
    emit(this, 'dismiss')
  }
}

export default Notice
