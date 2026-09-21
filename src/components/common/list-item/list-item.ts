import { LitElement, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { AvatarShape, AvatarSize, AvatarVariant } from '@/components/common/avatar/avatar'
import type { IconName } from '@/components/common/icon/icon-names'
import type { PropertyValues } from 'lit'

import { listItemStyles } from '@/components/common/list-item/list-item.styles'
import '@/components/common/avatar/avatar'
import '@/components/common/flex/flex'
import '@/components/common/text'

export type ListItemSize = 'small' | 'medium' | 'large'
/** description을 그리는 사이즈. small은 한 줄이라 설명 자리를 갖지 않는다. */
type DescribableSize = Exclude<ListItemSize, 'small'>
export const LIST_ITEM_SIZE_TYPE_LABEL = "'small' | 'medium' | 'large' = 'small'"

/* 행 높이 안에서 라벨과 설명 두 줄이 차지하는 크기. 두 줄의 line-height 합이 행 높이를 넘지 않는다. */
const LABEL_TEXT_SIZE: Record<ListItemSize, string> = { small: '14', medium: '14', large: '18' }
const DESCRIPTION_TEXT_SIZE: Record<DescribableSize, string> = { medium: '12', large: '14' }

/**
 * leading(아바타·아이콘) + content(title/description) + trailing 한 줄을 구성하는 표현 전용 primitive.
 * 상호작용(role, hover 등)은 포함하지 않는다. 메뉴 의미가 필요하면 mm-menu-item-action을 쓴다.
 * 두 줄이 되는 행은 medium부터다. small은 한 줄만 그리고 description을 받아도 무시한다.
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
  @property({ type: String, attribute: 'avatar-variant' }) avatarVariant: AvatarVariant = 'primary'
  @property({ type: String, attribute: 'avatar-shape' }) avatarShape: AvatarShape = 'square'
  @state() private hasTrailing = false

  protected willUpdate(changed: PropertyValues) {
    if (!changed.has('description') && !changed.has('size')) return

    this.toggleAttribute('has-description', this.size !== 'small' && !!this.description)
  }

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
    if (!this.hasLeading) return nothing

    return html`
      <span slot="leading">${this.renderLeadingContent()}</span>
    `
  }

  private renderLeadingContent() {
    return html`
      <mm-avatar
        size=${this.avatarSize}
        variant=${this.avatarVariant}
        shape=${this.avatarShape}
        icon=${ifDefined(this.icon)}
        src=${ifDefined(this.avatarSrc || undefined)}
      >
        ${this.renderEmoji()}
      </mm-avatar>
    `
  }

  private renderEmoji() {
    if (!this.emoji) return nothing

    return html`
      <span class="emoji" aria-hidden="true">${this.emoji}</span>
    `
  }

  private renderLabel() {
    if (!this.label) return nothing

    return html`
      <mm-text size=${LABEL_TEXT_SIZE[this.size]}>${this.label}</mm-text>
    `
  }

  private renderDescription() {
    const { size } = this
    if (size === 'small' || !this.description) return nothing

    return html`
      <mm-text size=${DESCRIPTION_TEXT_SIZE[size]} color="light">${this.description}</mm-text>
    `
  }

  private get avatarSize(): AvatarSize {
    if (this.size === 'small') return '32'

    return this.size === 'medium' ? '40' : '80'
  }

  private get hasLeading() {
    return !!(this.icon || this.avatarSrc || this.emoji)
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
