import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import type { IconName } from '@/components/common/icon-button/semantics/icon-names'

import { resetStyles } from '@/stylesheets/shared.styles'
import '@/components/common/button/button'
import '@/components/common/icon/icon'
import { emit } from '@/utils'

/**
 * AI 응답 출처 소스 칩. 클릭 시 inline sheet로 상세 정보를 표시합니다.
 * mm-chat-source-group 안에서 사용합니다.
 */
@customElement('mm-chat-source')
export class ChatSource extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: inline-block;
      }
    `,
  ]

  @property({ type: String }) href = ''
  @property({ type: String }) heading = ''
  @property({ type: String }) description = ''
  @property({ type: String }) label = ''
  @property({ type: String }) icon?: IconName

  @state() private open = false

  render() {
    return html`
      <mm-button
        variant="tertiary"
        size="small"
        aria-expanded=${this.open ? 'true' : 'false'}
        aria-haspopup="dialog"
        @click=${this.handleClick}
      >
        ${this.renderIcon()} ${this.domain}
      </mm-button>
    `
  }

  private renderIcon() {
    if (!this.icon) return nothing

    return html`
      <mm-icon name=${this.icon}></mm-icon>
    `
  }

  setOpen(open: boolean) {
    this.open = open
  }

  private get domain() {
    if (this.label) return this.label
    try {
      return new URL(this.href).hostname.replace(/^www\./, '')
    } catch {
      return this.href
    }
  }

  private handleClick(e: Event) {
    e.stopPropagation()
    emit(this, 'source-toggle', { source: this, open: !this.open })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-chat-source': ChatSource
  }
}
