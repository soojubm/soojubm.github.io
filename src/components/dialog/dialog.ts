import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/sheet'
import '@/components/sheet/semantics/sheet-body'
import '@/components/sheet/semantics/sheet-footer'
import '@/components/status-message'
import type { ActionConfig } from '@/components/action-config'

import { emit } from '@/utils/emit'

@customElement('mm-dialog')
export class Dialog extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `

  @property({ type: Boolean, reflect: true }) open = false
  @property({ type: String }) heading = ''
  @property({ type: String }) description = ''
  @property({ attribute: false }) primaryAction?: ActionConfig
  @property({ attribute: false }) secondaryAction?: ActionConfig

  render() {
    return html`
      <mm-sheet
        variant="center"
        width="small"
        ?open=${this.open}
        @sheetclose=${this.handleSheetClose}
      >
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
      </mm-sheet>
    `
  }

  show() {
    this.open = true
  }

  close() {
    this.open = false
  }

  private handleSheetClose() {
    this.open = false
    emit(this, 'dialog-close')
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-dialog': Dialog
  }
}
