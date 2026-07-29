import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/overlay/backdrop/backdrop'
import '@/components/overlay/layer/layer-body'
import '@/components/overlay/layer/layer-footer'
import '@/components/common/status-message'
import type { ActionConfig } from '@/types'

import { layerPositionStyles, overlaySurfaceStyles } from '@/components/overlay/overlay.styles'
import { LayerController } from '@/controllers/layer-controller'
import { emit } from '@/utils'

@customElement('mm-dialog')
export class Dialog extends LitElement {
  static styles = [
    overlaySurfaceStyles,
    layerPositionStyles,
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
      <mm-backdrop></mm-backdrop>
      <div class="panel" ?open=${this.open}>
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
