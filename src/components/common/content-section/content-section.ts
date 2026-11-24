import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common/text/semantics/text-block'
import type { TextBlockLevel } from '@/components/common/text/semantics/text-block'

@customElement('mm-content-section')
export class ContentSection extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-6);
    }

    .title {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }
  `
  @property({ type: String }) heading = ''
  @property({ type: Number, attribute: 'heading-level' }) headingLevel = 2
  @property({ type: String }) description = ''

  render() {
    return html`
      <div class="title">
        <mm-text-block
          level=${String(this.headingLevel) as TextBlockLevel}
          heading=${this.heading}
          description=${this.description}
        ></mm-text-block>
        <slot name="action"></slot>
      </div>
      <slot></slot>
    `
  }
}
