import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { resetStyles } from '@/stylesheets/shared.styles'
import '@/components/common/surface/surface'
import '@/components/common/scroll/scroll'

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

      mm-scroll {
        width: 100%;
      }
    `,
  ]

  render() {
    return html`
      <mm-surface variant="outlined" radius="large">
        <mm-scroll>
          <slot></slot>
        </mm-scroll>
      </mm-surface>
    `
  }
}
