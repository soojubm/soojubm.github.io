import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { resetStyles } from '@/stylesheets/shared/reset.styles'

@customElement('mm-selection-indicator')
export class SelectionIndicator extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
        width: var(--selection-indicator-width, var(--space-05));
        height: var(--selection-indicator-height, var(--selection-indicator-size));
        flex-shrink: 0;
        border-radius: var(--radius);
        background: var(--selection-indicator-color);
        opacity: 1;
        transform: translateY(var(--selection-indicator-y, 0)) scaleY(1);
        transform-origin: center;
        transition: opacity 0.16s ease, transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
      }

      :host([position='absolute']) {
        position: absolute;
        top: 0;
        left: 0;
      }

      @media (prefers-reduced-motion: reduce) {
        :host {
          transition: none;
        }
      }
    `,
  ]

  render() {
    return html``
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-selection-indicator': SelectionIndicator
  }
}
