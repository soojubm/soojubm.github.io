import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { emit } from '../../../utils/emit'

@customElement('mm-sheet-header')
class SheetHeader extends LitElement {
  @property({ type: String }) heading = ''
  @property({ type: Boolean, attribute: 'close-button' }) closeButton = true

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
    emit(this, 'sheetclose')
  }

  render() {
    return html`
      <header role="navigation">
        <mm-paragraph size="large">${this.heading}</mm-paragraph>
        ${this.closeButton
          ? html`
              <mm-close-button @close=${this.handleClose}></mm-close-button>
            `
          : nothing}
      </header>
    `
  }
}

export default SheetHeader
