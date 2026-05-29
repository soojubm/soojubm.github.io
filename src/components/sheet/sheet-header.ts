import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('mm-sheet-header')
class SheetHeader extends LitElement {
  @property({ type: String }) title = ''

  static styles = css`
    :host { display: flex; align-items: center; justify-content: space-between; padding: 1rem 0; border-bottom: var(--border); background: var(--color-background); }
  `

  private handleClose = () => {
    this.dispatchEvent(new CustomEvent('sheetclose', { bubbles: true, composed: true }))
  }

  render() {
    return html`
      <mm-text size="18">${this.title}</mm-text>
      <mm-icon-button variant="navigator" icon="xmark" aria-label="Close" @click="${this.handleClose}"></mm-icon-button>
    `
  }
}

export default SheetHeader
