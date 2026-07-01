import { LitElement, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { IconName } from '@/components/icon-button/semantics/icon-names'

import { listRowStyles } from '@/components/list-row/list-row.styles'
import '@/components/avatar/avatar'
import '@/components/flex/flex'

/**
 * leading(아바타·아이콘) + content(title/description) + trailing 한 줄을 구성하는 표현 전용 primitive.
 * 상호작용(role, hover 등)은 포함하지 않는다. 메뉴 의미가 필요하면 mm-menu-item-action을 쓴다.
 */
@customElement('mm-list-row')
export class ListRow extends LitElement {
  static styles = [listRowStyles]

  @property({ type: String, reflect: true }) size = 'medium'
  @property({ type: String }) label = ''
  @property({ type: String }) description = ''

  @property({ type: String }) icon?: IconName
  @property({ type: String }) emoji = ''
  @property({ type: String, attribute: 'avatar-src' }) avatarSrc = ''
  @property({ type: String, attribute: 'avatar-variant' }) avatarVariant = 'tertiary'

  @state() private hasAvatar = false

  render() {
    return html`
      ${this.renderLeading()}
      <mm-flex direction="column" gap="0">
        ${this.renderLabel()} ${this.renderDescription()}
      </mm-flex>
      <span slot="trailing">
        <slot name="trailing"></slot>
      </span>
    `
  }

  private renderLeading() {
    if (!this.hasLeading) {
      return html`
        <slot name="avatar" hidden @slotchange=${this.handleAvatarSlotChange}></slot>
      `
    }

    return html`
      <span slot="leading">${this.renderLeadingContent()}</span>
    `
  }

  private renderLeadingContent() {
    if (this.emoji) {
      return html`
        <span class="emoji" aria-hidden="true">${this.emoji}</span>
      `
    }

    if (this.hasAvatar) {
      return html`
        <slot name="avatar" @slotchange=${this.handleAvatarSlotChange}></slot>
      `
    }

    return html`
      <mm-avatar
        size=${this.size}
        variant=${this.avatarVariant}
        icon=${ifDefined(this.icon)}
        src=${ifDefined(this.avatarSrc || undefined)}
      ></mm-avatar>
    `
  }

  private renderLabel() {
    if (!this.label) {
      return html`
        <slot></slot>
      `
    }

    return html`
      <mm-text size=${this.size === 'large' || this.size === 'huge' ? '18' : '14'}>
        ${this.label}
      </mm-text>
    `
  }

  private renderDescription() {
    if (!this.description) return nothing

    return html`
      <mm-text size="14" color="light">${this.description}</mm-text>
    `
  }

  private get hasLeading() {
    return !!(this.icon || this.avatarSrc || this.emoji || this.hasAvatar)
  }

  private handleAvatarSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement
    this.hasAvatar = this.hasAssignedContent(slot)
  }

  private hasAssignedContent(slot: HTMLSlotElement) {
    return slot
      .assignedNodes({ flatten: true })
      .some(
        node =>
          (node.nodeType === Node.TEXT_NODE && node.textContent?.trim() !== '') ||
          node.nodeType === Node.ELEMENT_NODE,
      )
  }
}

export default ListRow
