import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { ActionConfig } from '@/components/action-config'
import type { IconName } from '@/components/icon-button/semantics/icon-names'

import '@/components/button/button'
import '@/components/button/button-group'

import { resultStyles } from '@/components/result/result.styles'

@customElement('mm-result')
class Result extends LitElement {
  static styles = [resultStyles]

  @property({ type: String, attribute: 'avatar-icon' }) avatarIcon?: IconName
  @property({ type: String }) heading = ''
  @property({ type: String }) description = ''
  @property({ type: String, reflect: true }) role = 'status'
  @property({ attribute: false }) primaryAction?: ActionConfig

  render() {
    return html`
      <slot name="avatar">${this.renderAvatar()}</slot>
      <mm-text-block
        level="3"
        heading=${this.heading}
        description=${this.description}
        centered
      ></mm-text-block>
      <slot></slot>
      <mm-button-group justify-content="center" wrap>
        ${this.renderPrimaryAction()}
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
}

export default Result
