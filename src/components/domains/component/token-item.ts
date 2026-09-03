import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { tokenValue } from '@/components/domains/component/token-values'
import { resetStyles } from '@/stylesheets/shared.styles'
import '@/components/common/meta-item/meta-item'

@customElement('mm-token-item')
export class TokenItem extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: inline-flex;
        padding: var(--space-3) var(--space-4);
        border: var(--border);
        border-radius: var(--radius);
      }
    `,
  ]

  @property({ type: String }) key = ''
  @property({ type: Number }) index = 0

  render() {
    return html`
      <mm-meta-item layout="stacked" label=${this.key} value=${tokenValue(this.key)}></mm-meta-item>
      <slot></slot>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-token-item': TokenItem
  }
}
