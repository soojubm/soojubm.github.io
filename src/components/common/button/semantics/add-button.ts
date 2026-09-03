import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/common/icon-button/semantics/icon-names'
import '@/components/common/list-item/list-item'
import '@/components/common/menu-item/semantics/menu-item-action'

@customElement('mm-add-button')
export class AddButton extends LitElement {
  render() {
    return html`
      <mm-menu-item-action icon=${ICON_NAMES.ADD_CIRCLE}>
        <slot></slot>
      </mm-menu-item-action>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-add-button': AddButton
  }
}
