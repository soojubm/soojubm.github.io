import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { surfaceBaseStyles, surfaceFilledStyles } from '@/components/common/surface/surface.styles'
import '@/components/common'

@customElement('fff-banner')
export class Banner extends LitElement {
  static styles = css`
    :host {
      ${surfaceBaseStyles};
      ${surfaceFilledStyles};
      --surface-padding: var(--space-16) var(--space-6);
      --surface-border-radius: var(--border-radius-large);

      justify-content: center;
      align-items: center;
      gap: var(--space-6);
    }

    :host([variant='primary']) {
      --surface-background-color: var(--primary-subtle-color);
    }
  `
  @property({ type: String, reflect: true }) variant?: 'primary'
  @property({ type: String }) heading = ''
  @property({ type: String }) description = ''

  render() {
    return html`
      <fff-text-block
        level="2"
        centered
        heading=${this.heading}
        description=${this.description}
      ></fff-text-block>
      <slot name="action"></slot>
    `
  }
}
