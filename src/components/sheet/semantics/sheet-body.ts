import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { scrollbarStyles } from '../../../stylesheets/shared/scrollbar.styles'

@customElement('mm-sheet-body')
class SheetBody extends LitElement {
  static styles = [
    scrollbarStyles,
    css`
      :host {
        box-sizing: border-box;
        overflow-y: auto;
      }
    `,
  ]

  render() {
    return html`
      <slot></slot>
    `
  }
}

export default SheetBody
