import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common'

@customElement('mm-figure-card')
export class FigureCard extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }

    .figure {
      display: flex;
      align-items: center;
      justify-content: center;
      height: var(--size-80);
      border-radius: var(--border-radius);
      background: var(--background-color);
      box-shadow: inset 0 0 0 var(--border-width) var(--border-color);
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
