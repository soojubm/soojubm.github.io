import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('mm-sheet-header')
class SheetHeader extends LitElement {
  @property({ type: String }) title = ''

  static styles = css`
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: var(--space-3) 0;
      // height: var(--size-large);
      gap: var(--space-2);
      box-sizing: border-box;
    }
  `

  private handleClose = () => {
    this.dispatchEvent(new CustomEvent('sheetclose', { bubbles: true, composed: true }))
  }

  render() {
    return html`
      <header role="navigation">
        <mm-text size="18">${this.title}</mm-text>
        <mm-icon-button icon="xmark" aria-label="닫기" @click=${this.handleClose}></mm-icon-button>
      </header>
    `
  }
}

export default SheetHeader
