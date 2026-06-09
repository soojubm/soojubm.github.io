import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('mm-sheet-body')
class SheetBody extends LitElement {
  static styles = css`
    :host {
      display: block;
      flex: 1 1 auto;
      min-height: 0;
      overflow-y: auto;
      box-sizing: border-box;
    }
    .content {
      padding: var(--space-4) 0;
      box-sizing: border-box;
    }
  `

  render() {
    return html`<div class="content"><slot></slot></div>`
  }
}

export default SheetBody
