import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/flex/flex'
import { componentExampleStyles } from './example.styles'

@customElement('mm-component-section')
class ComponentSection extends LitElement {
  static styles = [
    componentExampleStyles,
    css`
      .component-section {
        margin-top: var(--space-section);
      }

      .component-content-frame {
        margin-top: var(--space-4);
      }
    `,
  ]

  @property({ type: String }) heading = ''
  @property({ type: String }) description = ''

  render() {
    return html`
      <mm-flex class="component-section" direction="column" gap="2">
        <mm-text size="24" weight="bold" as="h3">${this.heading}</mm-text>
        ${this.renderDescription()}
        <div class="component-content-frame">
          <slot></slot>
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
}

export default ComponentSection
