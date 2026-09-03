import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common/tag/tag'

import { componentExampleStyles } from './component.styles'
import '@/components/common/text/semantics/text-block'

@customElement('mm-component-section')
class ComponentSection extends LitElement {
  static styles = [
    componentExampleStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--space-6);
        margin-top: var(--space-section);
      }
    `,
  ]

  @property({ type: String }) heading = ''
  @property({ type: String }) description = ''

  render() {
    return html`
      <mm-text-block
        level="2"
        heading=${this.heading}
        description=${this.description}
      ></mm-text-block>
      <div class="component-content-frame">
        <slot></slot>
      </div>
    `
  }
}

export default ComponentSection
