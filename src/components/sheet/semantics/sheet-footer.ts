import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { ActionConfig } from '@/components/action-config'

import { sheetFooterStyles } from '@/components/sheet/sheet.styles'
import { emit } from '@/utils/emit'

@customElement('mm-sheet-footer')
class SheetFooter extends LitElement {
  static styles = sheetFooterStyles

  @property({ attribute: false }) primaryAction?: ActionConfig
  @property({ attribute: false }) secondaryAction?: ActionConfig

  render() {
    return html`
      <mm-button-group justify-content="end" stretch>
        ${this.renderSecondaryAction()} ${this.renderPrimaryAction()}
      </mm-button-group>
    `
  }

  private renderSecondaryAction() {
    if (!this.secondaryAction) return nothing

    return html`
      <mm-button
        variant="tertiary"
        size="large"
        full-width
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
        size="large"
        full-width
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
