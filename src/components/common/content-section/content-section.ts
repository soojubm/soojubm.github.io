import { LitElement, css, html, nothing, type TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common/text/semantics/text-block'
import '@/components/common/text/semantics/text-list'
import type { TextBlockLevel } from '@/components/common/text/semantics/text-block'
import type { ListMarkerVariant } from '@/components/indicators/list-marker/list-marker'

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

    .intro {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }
  `
  @property({ type: String }) heading = ''
  @property({ type: Number, attribute: 'heading-level' }) headingLevel = 2
  @property({ type: String }) description = ''
  @property({ attribute: false }) texts?: Array<string | TemplateResult>
  @property({ type: String }) variant: ListMarkerVariant = 'check'

  render() {
    return html`
      <div class="title">
        <div class="intro">
          <mm-text-block
            level=${String(this.headingLevel) as TextBlockLevel}
            heading=${this.heading}
            description=${this.description}
          ></mm-text-block>
          ${this.renderTexts()}
        </div>
        <slot name="action"></slot>
      </div>
      <slot></slot>
    `
  }

  private renderTexts() {
    if (!this.texts) return nothing

    return html`
      <mm-text-list variant=${this.variant} .texts=${this.texts}></mm-text-list>
    `
  }
}
