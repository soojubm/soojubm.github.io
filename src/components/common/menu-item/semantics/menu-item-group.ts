import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { resetStyles } from '@/stylesheets/shared.styles'

export type MenuItemGroupSize = '' | 'large'

@customElement('mm-menu-item-group')
export class MenuItemGroup extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: 0;
      }

      :host([size='large']) {
        gap: var(--space-2);
      }
    `,
  ]

  @property({ type: String, reflect: true }) role = 'menu'
  @property({ type: String, reflect: true }) size: MenuItemGroupSize = ''

  render() {
    return html`
      <slot></slot>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-menu-item-group': MenuItemGroup
  }
}
