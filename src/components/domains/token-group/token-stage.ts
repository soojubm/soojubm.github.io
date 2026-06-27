import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { resetStyles } from '@/stylesheets/shared/reset.styles'
import '@/components/flex/flex'

@customElement('mm-token-stage')
export class TokenStage extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
      }

      .stage {
        padding: var(--space-8);
        border: var(--border);
        border-radius: var(--radius-large);
        background: var(--color-background-subtle);
      }

      ::slotted(*) {
        position: relative;
      }
    `,
  ]

  render() {
    return html`
      <mm-flex direction="column" gap="3">
        <mm-flex class="stage" align-items="center" justify-content="center">
          <slot></slot>
        </mm-flex>
        <slot name="tokens"></slot>
      </mm-flex>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-token-stage': TokenStage
  }
}
