import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { IconName } from '@/components/common/icon/icon-names'
import type { ActionConfig } from '@/types'

import { renderActionButtons } from '@/components/common/button/button.utils'
import { resultStyles } from '@/components/common/result/result.styles'
import '@/components/common/avatar'
import '@/components/common/button/button'
import '@/components/common/button/button-group'
import '@/components/common/text/semantics/status-message'

@customElement('mm-result')
export class Result extends LitElement {
  static styles = [resultStyles]
  @property({ type: String, attribute: 'avatar-icon' }) avatarIcon?: IconName
  @property({ type: String }) heading = ''
  @property({ type: String }) description = ''
  @property({ type: String, reflect: true }) role = 'status'
  @property({ attribute: false }) primaryAction?: ActionConfig
  @property({ attribute: false }) secondaryAction?: ActionConfig

  render() {
    return html`
      ${this.renderAvatar()}
      <mm-status-message heading=${this.heading} message=${this.description}></mm-status-message>
      <slot></slot>
      ${this.renderActions()}
    `
  }

  private renderAvatar() {
    if (!this.avatarIcon) return nothing

    return html`
      <mm-avatar size="80" variant="secondary" icon=${this.avatarIcon}></mm-avatar>
    `
  }

  private renderActions() {
    if (!this.primaryAction && !this.secondaryAction) return nothing

    return html`
      <mm-button-group justify-content="center">
        ${renderActionButtons({
          primaryAction: this.primaryAction,
          secondaryAction: this.secondaryAction,
          size: 'large',
        })}
      </mm-button-group>
    `
  }
}
