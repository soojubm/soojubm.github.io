import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { ActionConfig } from '@/types'

import { layerFooterStyles } from '@/components/overlay/layer/layer.styles'
import { emit } from '@/utils'

@customElement('mm-layer-footer')
class LayerFooter extends LitElement {
  static styles = layerFooterStyles

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

export default LayerFooter
