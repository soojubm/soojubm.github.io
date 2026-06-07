import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'

@customElement('mm-token-group')
export class TokenGroup extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--space-3);
      }

      @media (max-width: 1200px) {
        :host {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (max-width: 800px) {
        :host {
          display: block;
        }
      }
    `,
  ]

  render() {
    return html`<slot></slot>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-token-group': TokenGroup
  }
}
