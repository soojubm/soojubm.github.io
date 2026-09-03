import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { ICON_NAMES, type IconName } from '@/components/common/icon-button/semantics/icon-names'
import { resetStyles } from '@/stylesheets/shared.styles'
import '@/components/common/icon/icon'
import '@/components/common/text/text'

export type ChatReasoningFlowTone = 'thinking' | 'searching' | 'reading' | 'writing'

const toneIconMap: Record<ChatReasoningFlowTone, IconName> = {
  thinking: ICON_NAMES.SPARKS,
  searching: ICON_NAMES.SEARCH,
  reading: ICON_NAMES.BOOK,
  writing: ICON_NAMES.DOCUMENT_CHECK,
}

/**
 * 현재 진행 중인 reasoning 흐름.
 *
 * <mm-chat-reasoning-flow tone="searching" label="관련 자료 탐색">
 *   디자인 토큰 문서를 찾는 중
 * </mm-chat-reasoning-flow>
 */
@customElement('mm-chat-reasoning-flow')
export class ChatReasoningFlow extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--space-1);
      }

      :host([hidden]) {
        display: none;
      }
    `,
  ]

  @property({ type: Boolean, reflect: true }) active = false
  @property({ type: String }) tone: ChatReasoningFlowTone = 'thinking'
  @property({ type: String }) label = ''
  @property({ type: String }) description = ''
  @property({ type: String }) icon?: IconName

  render() {
    return html`
      <mm-icon name=${this.icon || toneIconMap[this.tone] || ICON_NAMES.SPARKS}></mm-icon>
      ${this.renderLabel()} ${this.renderDescription()}
      <mm-text size="12" color="light"><slot></slot></mm-text>
    `
  }

  private renderLabel() {
    if (!this.label) return nothing

    return html`
      <mm-text size="14" weight="bold">${this.label}</mm-text>
    `
  }

  private renderDescription() {
    if (!this.description) return nothing

    return html`
      <mm-text size="12" color="light">${this.description}</mm-text>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-chat-reasoning-flow': ChatReasoningFlow
  }
}
