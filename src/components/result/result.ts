import { LitElement, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import type { IconName } from '../icon-button/semantics/icon-names'
import '../button/button-group'
import { resultStyles } from './result.styles'

@customElement('mm-result')
class Result extends LitElement {
  @property({ type: String, attribute: 'avatar-icon' }) avatarIcon?: IconName
  @property({ type: String }) heading = ''
  @property({ type: String }) description = ''
  @state() private hasDefaultContent = false
  @state() private hasActionContent = false

  static styles = [resultStyles]

  private handleSlotChange(kind: 'default' | 'action', event: Event) {
    const slot = event.target as HTMLSlotElement
    const hasContent = slot
      .assignedNodes({ flatten: true })
      .some(
        node =>
          (node.nodeType === Node.TEXT_NODE && node.textContent?.trim() !== '') ||
          node.nodeType === Node.ELEMENT_NODE,
      )

    if (kind === 'default') this.hasDefaultContent = hasContent
    if (kind === 'action') this.hasActionContent = hasContent
  }

  render() {
    return html`
      <div role="status" class="result">
        <slot name="avatar">
          ${this.avatarIcon
            ? html`
                <mm-avatar size="huge" variant="secondary" icon=${this.avatarIcon}></mm-avatar>
              `
            : nothing}
        </slot>
        <mm-text-block
          level="3"
          heading=${this.heading}
          description=${this.description}
          centered
        ></mm-text-block>
        <div class="result-content" ?hidden=${!this.hasDefaultContent}>
          <slot @slotchange=${(event: Event) => this.handleSlotChange('default', event)}></slot>
        </div>
        <mm-button-group
          class="result-actions"
          justify-content="center"
          wrap
          ?hidden=${!this.hasActionContent}
        >
          <slot
            name="action"
            @slotchange=${(event: Event) => this.handleSlotChange('action', event)}
          ></slot>
        </mm-button-group>
      </div>
    `
  }
}

export default Result
