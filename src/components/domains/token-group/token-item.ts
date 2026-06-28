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
        ${this.renderMarker()} ${this.renderKey()} ${this.renderValue()}
      </mm-flex>
      <slot></slot>
    `
  }

  private renderMarker() {
    if (!this.index) return nothing

    return html`
      <mm-list-marker value=${this.index}></mm-list-marker>
    `
  }

  private renderKey() {
    if (!this.key) return nothing

    return html`
      <mm-text>${this.key}</mm-text>
    `
  }

  private renderValue() {
    if (!this.value) return nothing

    return html`
      <mm-text>${this.value}</mm-text>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-token-item': TokenItem
  }
}
