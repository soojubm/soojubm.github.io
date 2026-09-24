import { LitElement, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import type { StatusTone } from '@/components/common/icon/icon-names'

import { STATUS_ICONS } from '@/components/common/icon/icon-names'
import { noticeStyles } from '@/components/common/notice/notice.styles'
import { emit } from '@/utils'
import '@/components/common/icon'
import '@/components/common/text/text'
import '@/components/common/text/semantics/heading'
import '@/components/common/icon-button/semantics/dismiss-button'

export type NoticeVariant = Extract<StatusTone, 'info' | 'success' | 'warning' | 'error'>

@customElement('mm-notice')
export class Notice extends LitElement {
  static styles = [noticeStyles]
  @property({ type: String, reflect: true }) role = 'note'
  @property({ type: String }) heading = ''
  @property({ type: String }) description = ''
  @property({ type: String, reflect: true, useDefault: true }) variant: NoticeVariant = 'info'
  @state() private dismissed = false
  @state() private dismissible = false
  private dismissListenerCount = 0

  render() {
    if (this.dismissed) return html``

    return html`
      <mm-icon name=${this.icon} class="notice-icon"></mm-icon>
      <div class="notice-content">
        ${this.renderText()}
        <slot></slot>
      </div>
      ${this.renderDismissButton()}
    `
  }

  private renderText() {
    if (!this.heading && !this.description) return nothing

    return html`
      <div class="notice-text">${this.renderHeading()} ${this.renderDescription()}</div>
    `
  }

  private renderHeading() {
    if (!this.heading) return nothing

    return html`
      <mm-heading level="4">${this.heading}</mm-heading>
    `
  }

  private renderDescription() {
    if (!this.description) return nothing

    return html`
      <mm-text size="14">${this.description}</mm-text>
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

  // 소비자가 dismiss를 구독할 때만 닫기 버튼을 노출한다.
  override addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void {
    super.addEventListener(type, listener, options)

    if (type !== 'dismiss') return
    this.dismissListenerCount += 1
    this.dismissible = true
  }

  override removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
  ): void {
    super.removeEventListener(type, listener, options)

    if (type !== 'dismiss') return
    this.dismissListenerCount = Math.max(0, this.dismissListenerCount - 1)
    this.dismissible = this.dismissListenerCount > 0
  }

  private get icon() {
    return STATUS_ICONS[this.variant]
  }

  // 버튼의 dismiss는 여기서 멈추고, notice 자신의 dismiss로 바꿔 알린다.
  private handleDismiss(event: Event) {
    event.stopPropagation()

    this.dismissed = true
    emit(this, 'dismiss')
  }
}
