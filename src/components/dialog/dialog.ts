import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/sheet'
import '@/components/sheet/semantics/sheet-header'
import '@/components/sheet/semantics/sheet-body'
import '@/components/sheet/semantics/sheet-footer'
import '@/components/text/semantics/paragraph'
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
        <mm-sheet-header heading=${this.heading} .closeButton=${false}></mm-sheet-header>

        <mm-sheet-body>
          ${this.renderDescription()}
          <slot></slot>
        </mm-sheet-body>

        <mm-sheet-footer
          .primaryAction=${this.primaryAction}
          .secondaryAction=${this.secondaryAction}
        ></mm-sheet-footer>
      </mm-sheet>
    `
  }

  private renderDescription() {
    if (!this.description) return nothing

    return html`
      <mm-paragraph>${this.description}</mm-paragraph>
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
