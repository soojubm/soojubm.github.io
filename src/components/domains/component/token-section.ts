import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common'
import '@/components/domains/component/term-block'

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
      <mm-term-block level="2" term=${this.heading} description=${this.description}></mm-term-block>
    `
  }
}
