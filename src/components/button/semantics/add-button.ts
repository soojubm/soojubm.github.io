import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { addButtonStyles } from '@/components/button/semantics/add-button.styles'
import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'
import '@/components/icon/icon'

@customElement('mm-add-button')
export class AddButton extends LitElement {
  static styles = [addButtonStyles]

  render() {
    return html`
      <button type="button">
        <mm-icon name=${ICON_NAMES.ADD_CIRCLE}></mm-icon>
        <slot></slot>
      </button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-add-button': AddButton
  }
}
