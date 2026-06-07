import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('mm-sheet-header')
class SheetHeader extends LitElement {
  @property({ type: String }) title = ''

  private handleClose = () => {
    this.dispatchEvent(new CustomEvent('sheetclose', { bubbles: true, composed: true }))
  }

  render() {
    return html`
      <mm-top-bar title="${this.title}" nav="close" @navclick="${this.handleClose}"></mm-top-bar>
    `
  }
}

export default SheetHeader
