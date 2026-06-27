import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '@/stylesheets/shared/reset.styles'
import '@/components/domains/indicators/list-marker'

@customElement('mm-token-item')
export class TokenItem extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
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
              <span>${this.key}</span>
            `
          : nothing}
        ${this.value
          ? html`
              <span>${this.value}</span>
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
