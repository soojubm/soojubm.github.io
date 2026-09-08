import { LitElement, css, html, nothing } from 'lit'
import { customElement, state } from 'lit/decorators.js'

import type { ChatSource } from '@/components/domains/chat/chat-source'

import { OutsideClickController } from '@/controllers/outside-click-controller'
import { resetStyles } from '@/stylesheets/shared.styles'
import '@/components/common/button/button-group'
import '@/components/common/icon/icon'
import '@/components/common/text/text'
import '@/components/common/text/semantics/paragraph'

/**
 * 소스 칩 그룹 + inline sheet 컨테이너.
 * <mm-chat-source-group> 안에 <mm-chat-source>를 넣으면,
 * 칩 클릭 시 그룹 바로 아래에 inline sheet가 열립니다.
 */
@customElement('mm-chat-source-group')
export class ChatSourceGroup extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
      }

      .sheet {
        margin-top: var(--space-2);
        background: var(--background-color);
        border: var(--border);
        border-radius: var(--radius);
        box-shadow: var(--surface-base-shadow);
        padding: var(--space-3);
        transform: translateY(0);
        opacity: 1;
        transition: opacity var(--transition-duration) var(--transition-easing),
          transform var(--transition-duration) var(--transition-easing-emphasis);
      }

      .sheet-icon {
        font-size: 1rem;
        flex-shrink: 0;
        color: var(--foreground-subtle-color);
      }

      .sheet-domain {
        font-size: var(--font-size-12);
        color: var(--foreground-subtle-color);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      mm-paragraph {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .sheet-link {
        display: inline-flex;
        align-items: center;
        gap: var(--space-1);
        font-size: var(--font-size-12);
        color: var(--color-accent);
        text-decoration: none;
        margin-top: var(--space-1);
      }
    `,
  ]

  @state() private activeSource: ChatSource | null = null

  // 바깥을 누르면 열려 있는 소스 시트를 닫는다.
  private outsideClick = new OutsideClickController(
    this,
    () => {
      this.activeSource?.setOpen(false)
      this.activeSource = null
    },
    { isActive: () => this.activeSource !== null },
  )

  render() {
    return html`
      <mm-button-group wrap @toggle=${this.handleSourceToggle}>
        <slot></slot>
      </mm-button-group>

      ${this.renderSheet()}
    `
  }

  private renderSheet() {
    if (!this.activeSource) return nothing

    return html`
      <div class="sheet" role="dialog" aria-label=${this.activeSource.heading || this.domain}>
        ${this.renderSheetHeader()} ${this.renderSheetHeading()} ${this.renderSheetDescription()}
        ${this.renderSheetLink()}
      </div>
    `
  }

  private renderSheetHeader() {
    if (!this.activeSource?.href) return nothing

    return html`
      <div class="sheet-header">
        ${this.renderSheetIcon()}
        <mm-text class="sheet-domain" size="12" color="light">${this.domain}</mm-text>
      </div>
    `
  }

  private renderSheetIcon() {
    if (!this.activeSource?.icon) return nothing

    return html`
      <mm-icon class="sheet-icon" name=${this.activeSource.icon}></mm-icon>
    `
  }

  private renderSheetHeading() {
    if (!this.activeSource?.heading) return nothing

    return html`
      <mm-paragraph>${this.activeSource.heading}</mm-paragraph>
    `
  }

  private renderSheetDescription() {
    if (!this.activeSource?.description) return nothing

    return html`
      <mm-paragraph size="small">${this.activeSource.description}</mm-paragraph>
    `
  }

  private renderSheetLink() {
    if (!this.activeSource?.href) return nothing

    return html`
      <a
        class="sheet-link"
        href=${this.activeSource.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        방문하기
      </a>
    `
  }

  private handleSourceToggle(e: CustomEvent) {
    const source = e.target as ChatSource
    const opening = e.detail.open as boolean

    if (!opening) {
      source.setOpen(false)
      this.activeSource = null
      return
    }

    // Close previously open source
    if (this.activeSource && this.activeSource !== source) this.activeSource.setOpen(false)

    source.setOpen(true)
    this.activeSource = source
  }

  private get domain() {
    return this.activeSource?.domain ?? ''
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-chat-source-group': ChatSourceGroup
  }
}
