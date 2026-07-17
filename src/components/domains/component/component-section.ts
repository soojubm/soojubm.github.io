import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { componentExampleStyles } from './component-example.styles'

@customElement('mm-component-section')
class ComponentSection extends LitElement {
  static styles = [
    componentExampleStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
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
      <mm-text size="24" weight="bold" as="h3">${this.heading}</mm-text>
      ${this.renderDescription()}
      <div class="component-content-frame">
        <slot></slot>
      </div>
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
