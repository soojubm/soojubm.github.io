import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/overlay/backdrop/backdrop'
import '@/components/overlay/sheet/sheet-body'
import '@/components/overlay/sheet/sheet-footer'
import '@/components/common/text/semantics/status-message'
import type { ActionConfig } from '@/types'

import { sheetPositionStyles, overlaySurfaceStyles } from '@/components/overlay/overlay.styles'
import { SheetController } from '@/controllers/sheet-controller'
import { emit } from '@/utils'

@customElement('mm-dialog')
export class Dialog extends LitElement {
  static styles = [
    overlaySurfaceStyles,
    sheetPositionStyles,
    css`
      :host {
        --overlay-panel-min-width: 320px;
        --overlay-panel-max-width: 320px;
      }
    `,
  ]

  @property({ type: String, reflect: true }) role = 'dialog'
  @property({ type: String, attribute: 'aria-modal', reflect: true }) ariaModal = 'true'
  @property({ type: Boolean, reflect: true }) open = false
  @property({ type: String }) heading = ''
  @property({ type: String }) description = ''
  @property({ attribute: false }) primaryAction?: ActionConfig
  @property({ attribute: false }) secondaryAction?: ActionConfig

  private sheet = new SheetController(this, {
    isOpen: () => this.open,
    setOpen: open => {
      this.open = open
    },
    onDismiss: () => this.handleDismiss(),
  })

  render() {
    return html`
      <mm-backdrop></mm-backdrop>
      <div class="panel" ?open=${this.open}>
        <mm-sheet-body>
          <mm-status-message
            heading=${this.heading}
            message=${this.description}
          ></mm-status-message>
          <slot></slot>
        </mm-sheet-body>
        <mm-sheet-footer
          .primaryAction=${this.primaryAction}
          .secondaryAction=${this.secondaryAction}
        ></mm-sheet-footer>
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
