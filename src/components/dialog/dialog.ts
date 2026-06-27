import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import '../sheet'
import '../sheet/semantics/sheet-header'
import '../sheet/semantics/sheet-body'
import '../sheet/semantics/sheet-footer'
import '../text/semantics/paragraph'
import type Sheet from '../sheet/sheet'
import { emit } from '../../utils/emit'
import type { ActionConfig } from '../action-config'

@customElement('mm-dialog')
export class Dialog extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    mm-sheet[width='small'] {
      --sheet-width-small: 320px;
    }
  `

  @property({ type: Boolean, reflect: true }) open = false
  @property({ type: String }) heading = ''
  @property({ type: String }) description = ''
  @property({ attribute: false }) primaryAction?: ActionConfig
  @property({ attribute: false }) secondaryAction?: ActionConfig

  @query('mm-sheet') private _sheet?: Sheet

  show() {
    this.open = true
    this._sheet?.open()
  }

  close() {
    this.open = false
    this._sheet?.close()
  }

  updated(changed: Map<string, unknown>) {
    if (!changed.has('open')) return
    this.updateComplete.then(() => {
      if (this.open) {
        this._sheet?.open()
      } else {
        this._sheet?.close()
      }
    })
  }

  private handleSheetClose() {
    this.open = false
    emit(this, 'dialog-close')
  }

  render() {
    return html`
      <mm-sheet variant="center" width="small" @sheetclose=${this.handleSheetClose}>
        <mm-sheet-header heading=${this.heading} .closeButton=${false}></mm-sheet-header>

        <mm-sheet-body>
          ${this.description
            ? html`
                <mm-paragraph>${this.description}</mm-paragraph>
              `
            : nothing}
          <slot></slot>
        </mm-sheet-body>

        <mm-sheet-footer
          .primaryAction=${this.primaryAction}
          .secondaryAction=${this.secondaryAction}
        ></mm-sheet-footer>
      </mm-sheet>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-dialog': Dialog
  }
}
