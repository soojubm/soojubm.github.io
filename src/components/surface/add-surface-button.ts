import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'
import '@/components/icon/icon'
import '@/components/surface/surface'
import { addSurfaceButtonStyles } from '@/components/surface/add-surface-button.styles'

@customElement('mm-add-surface-button')
export class AddSurfaceButton extends LitElement {
  static styles = [addSurfaceButtonStyles]

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
    'mm-add-surface-button': AddSurfaceButton
  }
}
