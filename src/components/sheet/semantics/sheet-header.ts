import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('mm-sheet-header')
class SheetHeader extends LitElement {
  @property({ type: String }) title = ''

  static styles = css`
    header {
      display: flex;
      width: 100%;
      padding: var(--space-4) 0;
      align-items: center;
      gap: var(--space-2);
      box-sizing: border-box;
    }

    mm-text {
      flex: 1 1 auto;
      min-width: 0;
    }

    button {
      display: inline-flex;
      width: var(--size-medium);
      height: var(--size-medium);
      padding: 0;
      align-items: center;
      justify-content: center;
      border: var(--border);
      border-radius: var(--radius);
      background: var(--color-background);
      color: inherit;
      cursor: pointer;
      box-shadow: var(--shadow);
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
        <button type="button" aria-label="닫기" @click=${this.handleClose}>
          <mm-icon name="xmark"></mm-icon>
        </button>
      </header>
    `
  }
}

export default SheetHeader
