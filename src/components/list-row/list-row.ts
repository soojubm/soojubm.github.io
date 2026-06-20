import { LitElement, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import { listRowStyles } from './list-row.styles'
import '../avatar/avatar'

/**
 * leading(아바타·아이콘) + content(title/description) + trailing 한 줄을 구성하는 표현 전용 primitive.
 * 상호작용(role, hover 등)은 포함하지 않는다. 메뉴 의미가 필요하면 mm-menu-item-action을 쓴다.
 */
@customElement('mm-list-row')
export class ListRow extends LitElement {
  @property({ type: String, reflect: true }) size = 'medium'
  @property({ type: String }) label = ''
  @property({ type: String }) description = ''

  @property({ type: String }) icon = ''
  @property({ type: String }) emoji = ''
  @property({ type: String, attribute: 'avatar-src' }) avatarSrc = ''
  @property({ type: String, attribute: 'avatar-variant' }) avatarVariant = 'tertiary'

  static styles = [listRowStyles]

  @state() private hasTrailing = false

  private handleTrailingSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement
    this.hasTrailing = slot
      .assignedNodes({ flatten: true })
      .some(
        node =>
          (node.nodeType === Node.TEXT_NODE && node.textContent?.trim() !== '') ||
          node.nodeType === Node.ELEMENT_NODE,
      )
  }

  render() {
    const hasLeading = !!(this.icon || this.avatarSrc || this.emoji)

    return html`
      <div class="list-row">
        ${hasLeading
          ? html`
              <span class="list-row-leading">
                ${this.emoji
                  ? html`
                      <span class="list-row-emoji" aria-hidden="true">${this.emoji}</span>
                    `
                  : html`
                      <mm-avatar
                        size=${this.size}
                        variant=${this.avatarVariant}
                        icon=${ifDefined(this.icon || undefined)}
                        src=${ifDefined(this.avatarSrc || undefined)}
                      ></mm-avatar>
                    `}
              </span>
            `
          : nothing}
        <span class="list-row-content">
          ${this.label
            ? html`
                <mm-text size=${this.size === 'large' ? '18' : '14'}>${this.label}</mm-text>
              `
            : html`
                <slot></slot>
              `}
          ${this.description
            ? html`
                <mm-text size=${this.size === 'large' ? '14' : '12'} color="light">
                  ${this.description}
                </mm-text>
              `
            : nothing}
        </span>
        <span class="list-row-trailing" ?hidden=${!this.hasTrailing}>
          <slot name="trailing" @slotchange=${this.handleTrailingSlotChange}></slot>
        </span>
      </div>
    `
  }
}

export default ListRow
