import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { IconName } from '@/components/common/icon-button/semantics/icon-names'
import type { ActionConfig } from '@/types'

import '@/components/common/button/button'
import '@/components/common/button/button-group'
import '@/components/common/text/semantics/status-message'

import { resultStyles } from '@/components/common/result/result.styles'

@customElement('mm-result')
class Result extends LitElement {
  static styles = [resultStyles]

  @property({ type: String, attribute: 'avatar-icon' }) avatarIcon?: IconName
  @property({ type: String }) heading = ''
  @property({ type: String }) description = ''
  @property({ type: String, reflect: true }) role = 'status'
  @property({ attribute: false }) primaryAction?: ActionConfig
  @property({ attribute: false }) secondaryAction?: ActionConfig

  render() {
    return html`
      <slot name="avatar">${this.renderAvatar()}</slot>
      <mm-status-message heading=${this.heading} message=${this.description}></mm-status-message>
      <slot></slot>
      <mm-button-group justify-content="center" wrap>
        ${this.renderSecondaryAction()} ${this.renderPrimaryAction()}
        <slot name="action"></slot>
      </mm-button-group>
    `
  }

  private renderAvatar() {
    if (!this.avatarIcon) return nothing

    return html`
      <mm-avatar size="80" variant="secondary" icon=${this.avatarIcon}></mm-avatar>
    `
  }

  private renderSecondaryAction() {
    if (!this.secondaryAction) return nothing

    return html`
      <mm-button
        variant="tertiary"
        size="large"
        ?disabled=${this.secondaryAction.disabled}
        @click=${this.handleSecondaryActionClick}
      >
        ${this.secondaryAction.label}
      </mm-button>
    `
  }

  private renderPrimaryAction() {
    if (!this.primaryAction) return nothing

    return html`
      <mm-button
        variant="primary"
        size="large"
        ?disabled=${this.primaryAction.disabled}
        @click=${this.handlePrimaryActionClick}
      >
        ${this.primaryAction.label}
      </mm-button>
    `
  }

  private handlePrimaryActionClick() {
    this.primaryAction?.onClick?.()
  }

  private handleSecondaryActionClick() {
    this.secondaryAction?.onClick?.()
  }
}

export default Result
