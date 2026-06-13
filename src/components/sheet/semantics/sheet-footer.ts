import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

export interface SheetAction {
  label: string
  onClick: () => void
}

@customElement('mm-sheet-footer')
class SheetFooter extends LitElement {
  @property({ type: String, attribute: 'primary-label' }) primaryLabel = ''
  @property({ type: String, attribute: 'secondary-label' }) secondaryLabel = ''

  static styles = css`
    :host {
      padding: var(--space-3) 0;
    }
  `

  private handlePrimaryClick = () => {
    this.dispatchEvent(new CustomEvent('primary-click'))
  }

  private handleSecondaryClick = () => {
    this.dispatchEvent(new CustomEvent('secondary-click'))
  }

  render() {
    return html`
      <mm-button-group justify="end">
        ${this.secondaryLabel
          ? html`
              <mm-button variant="tertiary" size="medium" @click=${this.handleSecondaryClick}>
                ${this.secondaryLabel}
              </mm-button>
            `
          : ''}
        ${this.primaryLabel
          ? html`
              <mm-button variant="primary" size="medium" @click=${this.handlePrimaryClick}>
                ${this.primaryLabel}
              </mm-button>
            `
          : ''}
      </mm-button-group>
    `
  }
}

export default SheetFooter
