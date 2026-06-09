import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import '../sheet'
import '../sheet/semantics/sheet-header'
import '../sheet/semantics/sheet-body'
import '../sheet/semantics/sheet-footer'
import type Sheet from '../sheet/sheet'

@customElement('mm-dialog')
export class Dialog extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false
  @property({ type: String }) title = ''
  @property({ type: String }) description = ''
  @property({ type: Boolean, reflect: true }) closeable = false
  @property({ type: String, attribute: 'primary-label' }) primaryLabel = ''
  @property({ type: String, attribute: 'secondary-label' }) secondaryLabel = ''

  static styles = css`
    :host {
      display: block;
    }
  `

  private get _sheet(): Sheet | null {
    return this.shadowRoot?.querySelector('mm-sheet') as Sheet | null
  }

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
    this.dispatchEvent(new CustomEvent('dialog-close', { bubbles: true, composed: true }))
  }

  render() {
    const hasHeader = this.title || this.closeable
    const hasFooter = this.primaryLabel || this.secondaryLabel

    return html`
      <mm-sheet type="center" size="small" @sheetclose=${this.handleSheetClose}>
        ${hasHeader
          ? html`<mm-sheet-header title=${this.title}></mm-sheet-header>`
          : nothing}

        <mm-sheet-body>
          ${this.description ? html`<p>${this.description}</p>` : nothing}
          <slot></slot>
        </mm-sheet-body>

        ${hasFooter
          ? html`
              <mm-sheet-footer
                primary-label=${this.primaryLabel}
                secondary-label=${this.secondaryLabel}
                @primary-click=${() =>
                  this.dispatchEvent(new CustomEvent('primary-click', { bubbles: true, composed: true }))}
                @secondary-click=${() =>
                  this.dispatchEvent(new CustomEvent('secondary-click', { bubbles: true, composed: true }))}
              ></mm-sheet-footer>
            `
          : html`<slot name="footer"></slot>`}
      </mm-sheet>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-dialog': Dialog
  }
}
