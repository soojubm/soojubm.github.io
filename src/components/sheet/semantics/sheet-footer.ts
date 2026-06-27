import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { emit } from '../../../utils/emit'
import type { ActionConfig } from '../../action-config'

@customElement('mm-sheet-footer')
class SheetFooter extends LitElement {
  @property({ attribute: false }) primaryAction?: ActionConfig
  @property({ attribute: false }) secondaryAction?: ActionConfig

  static styles = css`
    :host {
      padding: var(--sheet-section-padding-block, var(--space-3)) 0;
    }
  `

  private handlePrimaryClick = () => {
    this.primaryAction?.onClick?.()
    emit(this, 'primary-click')
  }

  private handleSecondaryClick = () => {
    this.secondaryAction?.onClick?.()
    emit(this, 'secondary-click')
  }

  render() {
    return html`
      <mm-button-group justify-content="end">
        ${this.secondaryAction
          ? html`
              <mm-button
                variant="tertiary"
                size="medium"
                ?disabled=${this.secondaryAction.disabled}
                @click=${this.handleSecondaryClick}
              >
                ${this.secondaryAction.label}
              </mm-button>
            `
          : ''}
        ${this.primaryAction
          ? html`
              <mm-button
                variant="primary"
                size="medium"
                ?disabled=${this.primaryAction.disabled}
                @click=${this.handlePrimaryClick}
              >
                ${this.primaryAction.label}
              </mm-button>
            `
          : ''}
      </mm-button-group>
    `
  }
}

export default SheetFooter
