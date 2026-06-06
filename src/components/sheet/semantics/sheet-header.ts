import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('mm-sheet-header')
class SheetHeader extends LitElement {
  @property({ type: String }) title = ''

  static styles = css`
    :host { display: block; border-bottom: var(--border); background: var(--color-background); }
  `

  private handleClose = () => {
    this.dispatchEvent(new CustomEvent('sheetclose', { bubbles: true, composed: true }))
  }

  render() {
    return html`
      <mm-top-bar title="${this.title}" nav="close" @click="${this.handleClose}"></mm-top-bar>
    `
  }
}

export default SheetHeader
