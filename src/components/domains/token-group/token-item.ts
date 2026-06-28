import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { resetStyles } from '@/stylesheets/shared/reset.styles'
import '@/components/domains/indicators/list-marker'
import '@/components/text/text'

@customElement('mm-token-item')
export class TokenItem extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
      }
    `,
  ]

  @property({ type: String }) key = ''
  @property({ type: String }) value = ''
  @property({ type: Number }) index = 0

  render() {
    return html`
      <mm-flex gap="2" wrap>
        ${this.index
          ? html`
              <mm-list-marker value=${this.index}></mm-list-marker>
            `
          : nothing}
        ${this.key
          ? html`
              <mm-text>${this.key}</mm-text>
            `
          : nothing}
        ${this.value
          ? html`
              <mm-text>${this.value}</mm-text>
            `
          : nothing}
      </mm-flex>
      <slot></slot>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-token-item': TokenItem
  }
}
