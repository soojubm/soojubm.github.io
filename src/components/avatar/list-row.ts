import { LitElement, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import { listRowStyles } from './list-row.styles'

/**
 * leading + content(title/description) + trailing 한 줄을 구성하는 표현 전용 primitive.
 * 상호작용(role, hover 등)은 포함하지 않는다. 메뉴 의미가 필요하면 mm-menu-item-row를 쓴다.
 */
@customElement('mm-list-row')
export class ListRow extends LitElement {
  @property({ type: String }) label = ''
  @property({ type: String }) description = ''

  static styles = [listRowStyles]

  @state() private hasLeading = false
  @state() private hasTrailing = false

  private handleSlotChange(kind: 'leading' | 'trailing', event: Event) {
    const slot = event.target as HTMLSlotElement
    const hasContent = slot
      .assignedNodes({ flatten: true })
      .some(
        node =>
          (node.nodeType === Node.TEXT_NODE && node.textContent?.trim() !== '') ||
          node.nodeType === Node.ELEMENT_NODE,
      )

    if (kind === 'leading') this.hasLeading = hasContent
    if (kind === 'trailing') this.hasTrailing = hasContent
  }

  render() {
    return html`
      <div class="list-row">
        <span class="list-row-leading" ?hidden=${!this.hasLeading}>
          <slot name="leading" @slotchange=${(e: Event) => this.handleSlotChange('leading', e)}></slot>
        </span>
        <span class="list-row-content">
          ${this.label
            ? html`<mm-text size="14">${this.label}</mm-text>`
            : html`<slot></slot>`}
          ${this.description
            ? html`<mm-text
                size="14"
                color="var(--color-foreground-light)"
                style="margin-top: var(--space-1-minus)"
                >${this.description}</mm-text
              >`
            : nothing}
        </span>
        <span class="list-row-trailing" ?hidden=${!this.hasTrailing}>
          <slot name="trailing" @slotchange=${(e: Event) => this.handleSlotChange('trailing', e)}></slot>
        </span>
      </div>
    `
  }
}

export default ListRow
