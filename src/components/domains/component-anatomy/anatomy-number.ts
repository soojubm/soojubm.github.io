import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'

@customElement('mm-anatomy-number')
export class AnatomyNumber extends LitElement {
  @property({ type: Number }) value = 1

  static styles = [
    resetStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.25rem;
        height: 1.25rem;
        border-radius: 50%;
        background: var(--color-foreground);
        color: var(--color-background);
        font-size: var(--font-size-12);
        font-weight: var(--font-weight-bold);
      }
    `,
  ]

  render() {
    return html`${this.value}`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-anatomy-number': AnatomyNumber
  }
}
