import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/flex/flex'

@customElement('mm-component-section')
class ComponentSection extends LitElement {
  static styles = css`
    .component-section {
      margin-top: var(--space-section);
    }
  `

  @property({ type: String }) heading = ''
  @property({ type: String }) description = ''

  render() {
    return html`
      <mm-flex as="section" class="component-section" direction="column" gap="2">
        <mm-text size="24" weight="bold" as="h3">${this.heading}</mm-text>
        ${this.renderDescription()}
        <slot></slot>
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
