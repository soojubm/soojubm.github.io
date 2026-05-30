import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { resetStyles } from '../shared/reset.styles'

@customElement('mm-paragraph-group')
export class ParagraphGroup extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--space-4);
      }
    `,
  ]

  render() {
    return html`<slot></slot>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-paragraph-group': ParagraphGroup
  }
}
