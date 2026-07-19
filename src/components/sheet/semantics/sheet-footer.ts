import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { ActionConfig } from '@/components/action-config'

import { emit } from '@/utils/emit'

@customElement('mm-sheet-footer')
class SheetFooter extends LitElement {
  static styles = css`
    :host {
      display: block;
      box-sizing: border-box;
      padding: var(--sheet-padding-block) var(--sheet-padding-inline)
        calc(var(--sheet-padding-block) + env(safe-area-inset-bottom));
      border-top: var(--surface-highe-border);
      background: var(--surface-highe-background-color);
      backdrop-filter: var(--surface-highe-backdrop-filter);
      -webkit-backdrop-filter: var(--surface-highe-backdrop-filter);

      position: absolute;
      inset-inline: 0;
      bottom: 0;
      z-index: 1;
    }
  `

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
