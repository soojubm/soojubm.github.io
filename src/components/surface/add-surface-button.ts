import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import '../icon/icon'
import './surface'
import { addSurfaceButtonStyles } from './add-surface-button.styles'

@customElement('mm-add-surface-button')
export class AddSurfaceButton extends LitElement {
  static styles = [addSurfaceButtonStyles]

  render() {
    return html`
      <button type="button">
        <mm-icon name="plus"></mm-icon>
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
