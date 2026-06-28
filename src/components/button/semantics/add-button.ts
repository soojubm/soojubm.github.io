import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'
import '@/components/icon/icon'
import { addButtonStyles } from '@/components/button/semantics/add-button.styles'

@customElement('mm-add-button')
export class AddButton extends LitElement {
  static styles = [addButtonStyles]

  render() {
    return html`
      <button type="button">
        <mm-icon name=${ICON_NAMES.ADD}></mm-icon>
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
