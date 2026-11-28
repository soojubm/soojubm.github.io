import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import type { IconName } from '@/components/common'

import '@/components/common'
import '@/components/overlay/popover/popover'
import { uniqueId } from '@/utils'

@customElement('fff-chat-source')
export class ChatSource extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }
  `
  @property({ type: String }) href = ''
  @property({ type: String }) heading = ''
  @property({ type: String }) description = ''
  @property({ type: String }) label = ''
  @property({ type: String }) icon?: IconName
  // popover는 portal로 옮겨져 한 트리에 모이므로, 칩이 여럿이어도 id가 겹치지 않게 한다.
  private readonly detailId = uniqueId('source-detail')
  @state() private open = false

  render() {
    return html`
      <fff-button variant="secondary" aria-controls=${this.detailId}>
        ${this.renderIcon()} ${this.domain}
        <fff-expand-indicator ?expanded=${this.open}></fff-expand-indicator>
      </fff-button>
      <fff-popover id=${this.detailId} @toggle=${this.handlePopoverToggle}>
        <fff-flex direction="column" gap="1">
          ${this.renderDetailHeader()} ${this.renderHeading()} ${this.renderDescription()}
          ${this.renderLink()}
        </fff-flex>
      </fff-popover>
    `
  }

  private handlePopoverToggle = (event: CustomEvent<{ open: boolean }>) => {
    this.open = event.detail.open
  }

  private renderIcon() {
    if (!this.icon) return nothing

    return html`
      <fff-icon name=${this.icon}></fff-icon>
    `
  }

  private renderDetailHeader() {
    if (!this.href) return nothing

    return html`
      <fff-flex align-items="center" gap="1">
        ${this.renderIcon()}
        <fff-text size="12" max-lines="1" color="light">${this.domain}</fff-text>
      </fff-flex>
    `
  }

  private renderHeading() {
    if (!this.heading) return nothing

    return html`
      <fff-paragraph max-lines="3">${this.heading}</fff-paragraph>
    `
  }

  private renderDescription() {
    if (!this.description) return nothing

    return html`
      <fff-paragraph size="small" max-lines="3">${this.description}</fff-paragraph>
    `
  }

  private renderLink() {
    if (!this.href) return nothing

    return html`
      <fff-link href=${this.href} external>방문하기</fff-link>
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
