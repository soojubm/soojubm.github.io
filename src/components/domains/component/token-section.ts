import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common'

@customElement('mm-token-section')
export class TokenSection extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-6);
    }

    slot {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
    }
  `
  @property({ type: String }) heading = ''
  @property({ type: String }) description = ''
  render() {
    return html`
      ${this.renderHeader()}
      <slot></slot>
    `
  }

  private renderHeader() {
    return html`
      <mm-flex direction="column" gap="2" align="flex-start">
        <mm-heading level="2"><mm-code-tag size="large">${this.heading}</mm-code-tag></mm-heading>
        <mm-text size="14">${this.description}</mm-text>
      </mm-flex>
    `
  }
}
