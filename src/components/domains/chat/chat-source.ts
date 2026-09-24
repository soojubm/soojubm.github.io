import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { IconName } from '@/components/common'

import '@/components/common'
import '@/components/overlay/popover/popover'

/**
 * AI 응답 출처 소스 칩. 클릭하면 칩에 앵커된 popover로 상세 정보를 펼칩니다.
 * 열기·닫기·aria-expanded는 mm-popover가 소유하며, 여러 칩은 mm-button-group으로 묶습니다.
 */
@customElement('mm-chat-source')
export class ChatSource extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .detail {
      display: flex;
      flex-direction: column;
      gap: var(--space-1);
    }

    .detail-header {
      display: flex;
      align-items: center;
      gap: var(--space-1);
      color: var(--foreground-subtle-color);
    }
  `
  @property({ type: String }) href = ''
  @property({ type: String }) heading = ''
  @property({ type: String }) description = ''
  @property({ type: String }) label = ''
  @property({ type: String }) icon?: IconName

  render() {
    return html`
      <mm-popover>
        <mm-button slot="trigger" variant="tertiary">${this.renderIcon()} ${this.domain}</mm-button>
        <div class="detail">
          ${this.renderDetailHeader()} ${this.renderHeading()} ${this.renderDescription()}
          ${this.renderLink()}
        </div>
      </mm-popover>
    `
  }

  private renderIcon() {
    if (!this.icon) return nothing

    return html`
      <mm-icon name=${this.icon}></mm-icon>
    `
  }

  private renderDetailHeader() {
    if (!this.href) return nothing

    return html`
      <div class="detail-header">
        ${this.renderIcon()}
        <mm-text size="12" max-lines="1">${this.domain}</mm-text>
      </div>
    `
  }

  private renderHeading() {
    if (!this.heading) return nothing

    return html`
      <mm-paragraph max-lines="3">${this.heading}</mm-paragraph>
    `
  }

  private renderDescription() {
    if (!this.description) return nothing

    return html`
      <mm-paragraph size="small" max-lines="3">${this.description}</mm-paragraph>
    `
  }

  private renderLink() {
    if (!this.href) return nothing

    return html`
      <mm-link href=${this.href} external>방문하기</mm-link>
    `
  }

  get domain() {
    if (this.label) return this.label
    try {
      return new URL(this.href).hostname.replace(/^www\./, '')
    } catch {
      return this.href
    }
  }
}
