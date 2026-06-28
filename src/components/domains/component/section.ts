import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { componentContentFrameStylesFor } from '@/components/domains/component/component.styles'
import '@/components/flex/flex'

@customElement('mm-component-section')
class ComponentSection extends LitElement {
  static styles = [
    componentContentFrameStylesFor('.content'),
    css`
      .component-section {
        margin-top: var(--space-section);
      }

      .content {
        display: none;
      }

      :host([has-content]) .content {
        display: block;
        --component-content-frame-margin: var(--space-2) 0 0
          var(--component-content-offset-inline-start);
      }
    `,
  ]

  @property({ type: String }) heading = ''
  @property({ type: String }) description = ''
  @property({ type: String }) level: 'semantic' | 'domain' = 'semantic'

  @property({ type: Boolean, reflect: true, attribute: 'has-content' })
  private hasContent = false

  render() {
    return html`
      <mm-flex as="section" class="component-section" direction="column" gap="2">
        <div hidden><mm-tag>${this.level === 'domain' ? 'Domain' : 'Semantic'}</mm-tag></div>
        <mm-text size="24" weight="bold" as="h3">${this.heading}</mm-text>
        ${this.renderDescription()}
        <div class="content">
          <slot @slotchange=${this.onSlotChange}></slot>
        </div>
      </mm-flex>
    `
  }

  private renderDescription() {
    if (!this.description) return nothing

    return html`
      <mm-paragraph>${this.description}</mm-paragraph>
    `
  }

  private onSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement
    this.hasContent = slot.assignedElements().length > 0
  }
}

export default ComponentSection
