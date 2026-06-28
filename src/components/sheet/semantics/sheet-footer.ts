import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { ActionConfig } from '@/components/action-config'

import { emit } from '@/utils/emit'

@customElement('mm-sheet-footer')
class SheetFooter extends LitElement {
  static styles = css`
    :host {
      padding: var(--sheet-section-padding-block, var(--space-3)) 0;
    }
  `

  @property({ attribute: false }) primaryAction?: ActionConfig
  @property({ attribute: false }) secondaryAction?: ActionConfig

  render() {
    return html`
      <mm-button-group justify-content="end">
        ${this.renderSecondaryAction()} ${this.renderPrimaryAction()}
      </mm-button-group>
    `
  }

  private renderSecondaryAction() {
    if (!this.secondaryAction) return nothing

    return html`
      <mm-button
        variant="tertiary"
        size="medium"
        ?disabled=${this.secondaryAction.disabled}
        @click=${this.handleSecondaryClick}
      >
        ${this.secondaryAction.label}
      </mm-button>
    `
  }

  private renderPrimaryAction() {
    if (!this.primaryAction) return nothing

    return html`
      <mm-button
        variant="primary"
        size="medium"
        ?disabled=${this.primaryAction.disabled}
        @click=${this.handlePrimaryClick}
      >
        ${this.primaryAction.label}
      </mm-button>
    `
  }

  private handlePrimaryClick = () => {
    this.primaryAction?.onClick?.()
    emit(this, 'primary-click')
  }

  private handleSecondaryClick = () => {
    this.secondaryAction?.onClick?.()
    emit(this, 'secondary-click')
  }
}

export default SheetFooter
