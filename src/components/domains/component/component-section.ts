import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common/tag/tag'

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

      .component-section-heading {
        display: flex;
        align-items: center;
        gap: var(--space-2);
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
      <div class="component-section-heading">
        <mm-text size="24" weight="bold" as="h3">${this.heading}</mm-text>
      </div>
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
