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
        padding: 3rem 2rem;
        border: var(--border-stronger);
        border-radius: var(--radius-large);
        background: var(--color-background-subtle);
      }

      ::slotted(*) {
        position: relative;
      }

      .description {
        color: var(--color-foreground-light);
      }
    `,
  ]

  render() {
    return html`
      <div class="stage">
        <slot></slot>
      </div>
      <slot name="description" class="description"></slot>
      <slot name="tokens"></slot>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-token-stage': TokenStage
  }
}
