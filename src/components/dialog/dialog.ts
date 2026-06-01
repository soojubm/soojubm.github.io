import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../stylesheets/shared/reset.styles'
import '../button'
import '../icon-button'
import '../text/semantics/title-with-description'

@customElement('mm-dialog')
export class Dialog extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false
  @property({ type: String }) title = ''
  @property({ type: String }) description = ''
  @property({ type: Boolean, reflect: true }) center = false
  @property({ type: Boolean, reflect: true }) closeable = false
  @property({ type: String, attribute: 'type' }) dialogType: 'dialog' | 'alertdialog' = 'alertdialog'

  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
      }

      :host(:not([open])) {
        display: none;
      }

      .dialog {
        width: 100%;
        max-width: var(--popover-width-dialog);
        padding: var(--space-4);
        border: var(--border);
        border-radius: var(--radius);
        box-shadow: var(--shadow);
        box-sizing: border-box;
        background: var(--color-background);
        color: var(--color-foreground);
      }

      .dialog-document {
        position: relative;
        outline: none;
      }

      .dialog-close {
        position: absolute;
        right: calc(var(--space-2) * -1);
        top: calc(var(--space-2) * -1);
      }

      .dialog-body {
        margin: var(--space-2) 0 0;
      }

      .dialog-foot {
        display: flex;
        justify-content: flex-end;
        margin: var(--space-4) 0 0;
      }

      ::slotted([slot='footer']) {
        margin: var(--space-4) 0 0;
      }
    `,
  ]

  show() {
    this.open = true
  }

  close() {
    this.open = false
  }

  private handleClose() {
    this.open = false
    this.dispatchEvent(new CustomEvent('dialog-close', { bubbles: true, composed: true }))
  }

  private handleKeydown(event: KeyboardEvent) {
    if (event.key !== 'Escape') return
    this.handleClose()
  }

  render() {
    return html`
      <aside
        class="dialog"
        role=${this.dialogType}
        aria-modal="true"
        aria-label=${this.title || 'Dialog'}
        @keydown=${this.handleKeydown}
      >
        <div class="dialog-document" role="document" tabindex="0" @close=${this.handleClose}>
          ${this.closeable
            ? html`
                <div class="dialog-close">
                  <slot name="close">
                    <mm-close-button aria-label="닫기"></mm-close-button>
                  </slot>
                </div>
              `
            : nothing}

          ${this.title || this.description
            ? html`
                <mm-title-with-description
                  level="3"
                  title=${this.title}
                  description=${this.description}
                  ?center=${this.center}
                ></mm-title-with-description>
              `
            : nothing}

          <div class="dialog-body">
            <slot></slot>
          </div>

          <div class="dialog-foot">
            <slot name="footer"></slot>
          </div>
        </div>
      </aside>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-dialog': Dialog
  }
}
