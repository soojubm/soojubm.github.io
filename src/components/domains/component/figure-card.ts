import { LitElement, css, html, type PropertyValues } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { surfaceBaseStyles } from '@/components/common/surface/surface.styles'
import '@/components/common'

@customElement('fff-figure-card')
export class FigureCard extends LitElement {
  static styles = css`
    :host {
      --figure-card-padding-block: var(--space-4);

      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }

    .figure {
      ${surfaceBaseStyles};
      --surface-padding: var(--figure-card-padding-block) 0;
      --surface-border-radius: var(--border-radius-large);

      flex-direction: row;
      align-items: center;
      justify-content: center;
      height: var(--figure-card-height);
      min-height: var(--size-80);
    }

    .body {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-2);
    }
  `

  @property({ type: String }) description = ''
  @property({ type: String }) height?: string

  // 임의 값이라 나열할 수 없고 host가 소비하므로 host에 직접 주입한다.
  protected updated(changedProperties: PropertyValues) {
    if (!changedProperties.has('height')) return

    if (!this.height) {
      this.style.removeProperty('--figure-card-height')
      return
    }

    this.style.setProperty('--figure-card-height', this.height)
  }

  render() {
    return html`
      <div class="figure" aria-hidden="true"><slot name="figure"></slot></div>
      <div class="body">
        <fff-tag-group><slot name="tags"></slot></fff-tag-group>
        <fff-caption>${this.description}</fff-caption>
      </div>
      <slot></slot>
    `
  }
}
