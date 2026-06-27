import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { scrollbarStyles } from '../../../stylesheets/shared/scrollbar.styles'

@customElement('mm-sheet-body')
class SheetBody extends LitElement {
  static styles = [
    scrollbarStyles,
    css`
      :host {
        flex: 1 1 auto;
        min-height: 0;
        padding: 0 0 var(--sheet-body-padding-block-end, var(--space-4)) 0;
        overflow-y: auto;
        overflow-x: hidden;
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
