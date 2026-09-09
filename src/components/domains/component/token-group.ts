import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { resetStyles } from '@/stylesheets/shared.styles'

@customElement('mm-token-group')
export class TokenGroup extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-2);
      }
    `,
  ]

  render() {
    return html`
      <slot></slot>
    `
  }
}
