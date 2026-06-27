import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { resetStyles } from '@/stylesheets/shared/reset.styles'

@customElement('mm-tag-group')
export class TagGroup extends LitElement {
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

declare global {
  interface HTMLElementTagNameMap {
    'mm-tag-group': TagGroup
  }
}
