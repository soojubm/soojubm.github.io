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
        flex: 1 1 auto;
        min-height: 0;
        overflow-y: auto;
        scrollbar-color: var(--color-background-strong) transparent;
        scrollbar-gutter: stable;
        scrollbar-width: thin;
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
