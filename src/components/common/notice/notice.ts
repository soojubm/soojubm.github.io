import { LitElement, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import type { ActionConfig } from '@/types'

import { renderActionButtons } from '@/components/common/button/button.utils'
import { STATUS_ICONS, type StatusTone } from '@/components/common/icon/icon-names'
import { noticeStyles } from '@/components/common/notice/notice.styles'
import { EventSubscriptionController } from '@/controllers/event-subscription-controller'
import { emit } from '@/utils'
import '@/components/common/button/button'
import '@/components/common/button/button-group'
import '@/components/common/icon'
import '@/components/common/text/text'
import '@/components/common/icon-button/semantics/dismiss-button'

export type NoticeRole = 'alert' | 'note' | 'status'
export type NoticeVariant = Extract<StatusTone, 'info' | 'warning' | 'error'>

@customElement('fff-notice')
export class Notice extends LitElement {
  static styles = [noticeStyles]
  @property({ type: String, reflect: true }) role: NoticeRole = 'note'
  @property({ type: String }) description = ''
  @property({ type: String, reflect: true, useDefault: true }) variant: NoticeVariant = 'info'
  @property({ attribute: false }) primaryAction?: ActionConfig
  @property({ attribute: false }) secondaryAction?: ActionConfig
  @state() private dismissed = false
  private readonly dismissSubscription = new EventSubscriptionController(this, 'dismiss')

  render() {
    if (this.dismissed) return html``

    return html`
      <fff-icon name=${this.icon} class="notice-icon"></fff-icon>
      ${this.renderContent()} ${this.renderActions()}
    `
  }

  private renderContent() {
    return html`
      <div>
        ${this.renderDescription()}
        <slot></slot>
      </div>
    `
  }

  private renderDescription() {
    if (!this.description) return nothing

    return html`
      <fff-text size="14">${this.description}</fff-text>
    `
  }

  private renderActions() {
    if (!this.primaryAction && !this.secondaryAction && !this.dismissSubscription.subscribed)
      return nothing

    return html`
      <div class="notice-actions">
        ${renderActionButtons({
          primaryAction: this.primaryAction,
          secondaryAction: this.secondaryAction,
        })}
        ${this.renderDismissButton()}
      </div>
    `
  }

  private renderDismissButton() {
    if (!this.dismissSubscription.subscribed) return nothing

    return html`
      <fff-dismiss-button @dismiss=${this.handleDismiss}></fff-dismiss-button>
    `
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
