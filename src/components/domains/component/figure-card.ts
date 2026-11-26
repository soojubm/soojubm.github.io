import { LitElement, css, html, nothing } from 'lit'
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

  @property({ type: String }) label?: string
  @property({ type: String }) heading?: string
  @property({ type: String }) description = ''

  render() {
    return html`
      ${this.renderLabel()}
      <div class="figure" aria-hidden="true"><slot name="figure"></slot></div>
      <div class="body">
        <mm-tag-group><slot name="tags"></slot></mm-tag-group>
        ${this.renderCaption()}
      </div>
      <slot></slot>
    `
  }

  /** 제목이 있으면 설명은 제목 바로 아래에 한 쌍으로 붙는다. */
  private renderCaption() {
    if (!this.heading) {
      return html`
        <mm-caption>${this.description}</mm-caption>
      `
    }

    return html`
      <mm-text-block
        level="3"
        heading=${this.heading}
        description=${this.description}
      ></mm-text-block>
    `
  }

  private renderLabel() {
    if (!this.label) return nothing

    return html`
      <mm-tag size="large">${this.label}</mm-tag>
    `
  }
}
