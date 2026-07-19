import { LitElement, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { IconName } from '@/components/icon-button/semantics/icon-names'
import type { AvatarShape, AvatarSize, AvatarVariant } from '@/components/avatar/avatar'

import { listItemStyles } from '@/components/list-item/list-item.styles'
import '@/components/avatar/avatar'
import '@/components/flex/flex'
import '@/components/text/semantics/caption'

export type ListItemSize = 'small' | '48' | '80'

/**
 * leading(아바타·아이콘) + content(title/description) + trailing 한 줄을 구성하는 표현 전용 primitive.
 * 상호작용(role, hover 등)은 포함하지 않는다. 메뉴 의미가 필요하면 mm-menu-item-action을 쓴다.
 * small 사이즈는 description 유무에 따라 아바타를 32/40으로 내부에서 전환한다.
 */
@customElement('mm-list-item')
export class ListItem extends LitElement {
  static styles = [listItemStyles]

  @property({ type: String, reflect: true }) size: ListItemSize = 'small'
  @property({ type: String }) label = ''
  @property({ type: String }) description = ''

  @property({ type: String }) icon?: IconName
  @property({ type: String }) emoji = ''
  @property({ type: String, attribute: 'avatar-src' }) avatarSrc = ''
  @property({ type: String, attribute: 'avatar-variant' }) avatarVariant: AvatarVariant = 'tertiary'
  @property({ type: String, attribute: 'avatar-shape' }) avatarShape: AvatarShape = 'square'

  @state() private hasAvatar = false
  @state() private hasTrailing = false

  render() {
    return html`
      ${this.renderLeading()}
      <div class="content">${this.renderLabel()} ${this.renderDescription()}</div>
      ${this.renderTrailing()}
    `
  }

  private renderTrailing() {
    if (!this.hasTrailing) {
      return html`
        <slot name="trailing" hidden @slotchange=${this.handleTrailingSlotChange}></slot>
      `
    }

    return html`
      <span slot="trailing">
        <slot name="trailing" @slotchange=${this.handleTrailingSlotChange}></slot>
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
        size=${this.avatarSize}
        variant=${this.avatarVariant}
        shape=${this.avatarShape}
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
      <mm-text size=${this.size === '48' || this.size === '80' ? '18' : '14'}>
        ${this.label}
      </mm-text>
    `
  }

  private renderDescription() {
    if (!this.description) return nothing

    if (this.size === 'small') {
      return html`
        <mm-caption>${this.description}</mm-caption>
      `
    }

    return html`
      <mm-text size="14" color="light">${this.description}</mm-text>
    `
  }

  private get avatarSize(): AvatarSize {
    if (this.size === 'small') return this.description ? '40' : '32'

    return this.size
  }

  private get hasLeading() {
    return !!(this.icon || this.avatarSrc || this.emoji || this.hasAvatar)
  }

  private handleAvatarSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement
    this.hasAvatar = this.hasAssignedContent(slot)
  }

  private handleTrailingSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement
    this.hasTrailing = this.hasAssignedContent(slot)
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

export default ListItem
