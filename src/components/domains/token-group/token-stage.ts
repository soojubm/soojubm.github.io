import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'

@customElement('mm-token-stage')
export class TokenStage extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
      }

      .stage {
        display: flex;
        align-items: center;
        justify-content: center;
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
      <div class="stage">
        <slot></slot>
      </div>
      <slot name="tokens"></slot>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-token-stage': TokenStage
  }
}
