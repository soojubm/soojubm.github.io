import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { scrollbarStyles } from '../../../stylesheets/shared/scrollbar.styles'

@customElement('mm-sheet-body')
class SheetBody extends LitElement {
  static styles = [
    scrollbarStyles,
    css`
      :host {
        display: block;
        flex: 1 1 auto;
        min-height: 0;
        box-sizing: border-box;
        overflow-y: auto;
        scrollbar-color: var(--color-border-strong) transparent;
        scrollbar-gutter: stable;
      }
      :host::-webkit-scrollbar-thumb {
        background: var(--color-border-strong);
      }
      :host:hover::-webkit-scrollbar-thumb {
        background: var(--color-background-strong);
      }
    `,
  ]

  render() {
    return html`<div class="content"><slot></slot></div>`
  }
}

export default SheetBody
