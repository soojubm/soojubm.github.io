import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { resetStyles } from '@/stylesheets/shared/reset.styles'
import '@/components/surface/surface'

@customElement('mm-token-stage')
export class TokenStage extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
      }

      mm-surface {
        --surface-padding: var(--space-8) var(--space-16);
      }
    `,
  ]

  render() {
    return html`
      <mm-surface variant="outlined">
        <slot></slot>
      </mm-surface>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-token-stage': TokenStage
  }
}
