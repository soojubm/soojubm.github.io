import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { resetStyles } from '@/stylesheets/shared/reset.styles'
import '@/components/flex/flex'

@customElement('mm-menu-item-group')
export class MenuItemGroup extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
      }
    `,
  ]

  @property({ type: String, reflect: true }) role = 'menu'

  render() {
    return html`
      <mm-flex direction="column" gap="2">
        <slot></slot>
      </mm-flex>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-menu-item-group': MenuItemGroup
  }
}
