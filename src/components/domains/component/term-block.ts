import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common'

@customElement('fff-term-block')
export class TermBlock extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-3);
    }

    header {
      display: flex;
      flex-direction: column;
      align-items: inherit;
      gap: var(--space-3);
    }
  `
  @property({ type: String }) term = ''
  @property({ type: String }) description = ''
  @property({ type: String }) level: '2' | '3' = '3'

  render() {
    return html`
      <header>
        <fff-heading level=${Number(this.level)}>
          <fff-tag-group>
            <fff-code-tag size="large">${this.term}</fff-code-tag>
            <slot name="tags"></slot>
          </fff-tag-group>
        </fff-heading>
        ${this.renderDescription()}
      </header>
      <slot></slot>
    `
  }

  private renderDescription() {
    if (!this.description) return nothing

    return html`
      <fff-text size="14">${this.description}</fff-text>
    `
  }
}
