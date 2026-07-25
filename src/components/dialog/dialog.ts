import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/layer/semantics/layer-body'
import '@/components/layer/semantics/layer-footer'
import '@/components/status-message'
import type { ActionConfig } from '@/components/action-config'

import { layerStyles } from '@/components/layer/layer.styles'
import { LayerController } from '@/controllers/layer-controller'
import { emit } from '@/utils/emit'

@customElement('mm-dialog')
export class Dialog extends LitElement {
  static styles = [
    layerStyles,
    css`
      :host {
        --layer-max-width: 320px;
      }
    `,
  ]

  @property({ type: Boolean, reflect: true }) open = false
  @property({ type: String }) heading = ''
  @property({ type: String }) description = ''
  @property({ attribute: false }) primaryAction?: ActionConfig
  @property({ attribute: false }) secondaryAction?: ActionConfig

  private layer = new LayerController(this, {
    isOpen: () => this.open,
    onDismiss: () => this.handleDismiss(),
  })

  render() {
    return html`
      <div class="layer" ?open=${this.open}>
        <mm-layer-body>
          <mm-status-message
            heading=${this.heading}
            message=${this.description}
          ></mm-status-message>
          <slot></slot>
        </mm-layer-body>

        <mm-layer-footer
          .primaryAction=${this.primaryAction}
          .secondaryAction=${this.secondaryAction}
        ></mm-layer-footer>
      </div>
    `
  }

  show() {
    this.open = true
  }

  close() {
    this.open = false
  }

  private handleDismiss() {
    this.close()
    emit(this, 'dialog-close')
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-dialog': Dialog
  }
}
