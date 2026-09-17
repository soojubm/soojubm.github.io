import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common'

import { componentExampleStyles } from '@/components/domains/component/component.styles'

@customElement('mm-component-section')
export class ComponentSection extends LitElement {
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
  @property({ type: String }) code = ''
  @property({ type: Boolean, attribute: 'full-width', reflect: true }) fullWidth = false

  render() {
    return html`
      <mm-text-block
        level="2"
        heading=${this.heading}
        description=${this.description}
      ></mm-text-block>
      ${this.renderCode()}
      <div class="component-content-frame">
        <slot></slot>
      </div>
    `
  }

  private renderCode() {
    if (!this.code) return nothing

    return html`
      <mm-code-block .code=${this.code}></mm-code-block>
    `
  }
}
