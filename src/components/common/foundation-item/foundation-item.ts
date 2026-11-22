import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { surfaceBaseStyles } from '@/components/common/surface/surface.styles'
import '@/components/common/text/semantics/text-block'
import { resetStyles } from '@/stylesheets/shared.styles'

/**
 * Foundations Overview에서 하위 문서로 이동하는 링크 카드.
 */
@customElement('mm-foundation-item')
export class FoundationItem extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
      }

      a {
        ${surfaceBaseStyles};
        --surface-height: 100%;
        --surface-border-radius: var(--radius-large);
        --surface-shadow: var(--material-elevated-shadow);
        --lift: none;

        transform: var(--lift);
        transition: box-shadow var(--transition-duration) var(--transition-easing),
          transform var(--transition-duration) var(--transition-easing);
      }

      a:hover {
        --lift: var(--interaction-hover-lift);
      }

      a:focus-visible {
        outline: var(--interaction-focus-outline);
        outline-offset: 2px;
      }
    `,
  ]
  @property({ type: String }) href = ''
  @property({ type: String }) heading = ''
  @property({ type: String }) description = ''

  render() {
    return html`
      <a href=${this.href}>
        <mm-text-block
          level="3"
          heading=${this.heading}
          description=${this.description}
        ></mm-text-block>
      </a>
    `
  }
}
