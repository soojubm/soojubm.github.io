import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common'

@customElement('mm-figure-card')
export class FigureCard extends LitElement {
  static styles = css`
    :host {
      --figure-card-padding-block: var(--space-4);

      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }

    .figure {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: var(--size-80);
      padding-block: var(--figure-card-padding-block);
      border: var(--border);
      border-radius: var(--border-radius-large);
      background: var(--background-color);
    }

    .body {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-2);
    }
  `

  @property({ type: String }) description = ''

  render() {
    return html`
      <div class="figure" aria-hidden="true"><slot name="figure"></slot></div>
      <div class="body">
        <mm-tag-group><slot name="tags"></slot></mm-tag-group>
        <mm-caption>${this.description}</mm-caption>
      </div>
      <slot></slot>
    `
  }
}
