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
    :host div {
      display: flex;
      justify-content: flex-end;
      gap: var(--space-2);
      padding: var(--space-4) 0;
      border-top: var(--border);
      font-family: sans-serif;
    }
  `

  render() {
    return html`
      <div>
        ${this.secondaryLabel
          ? html`<mm-button
              class="secondary"
              @click="${() => this.dispatchEvent(new CustomEvent('secondary-click'))}"
              >${this.secondaryLabel}</mm-button
            >`
          : ''}
        ${this.primaryLabel
          ? html`<mm-button
              class="primary"
              variant="primary"
              @click="${() => this.dispatchEvent(new CustomEvent('primary-click'))}"
              >${this.primaryLabel}</mm-button
            >`
          : ''}
      </div>
    `
  }
}

export default SheetFooter
