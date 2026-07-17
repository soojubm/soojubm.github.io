import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import { emit } from '@/utils/emit'
import '@/components/button/semantics/add-button'

@customElement('mm-attachment-button')
export class AttachmentButton extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    input {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
    }
  `

  @property({ type: String }) label = ''
  @property({ type: String }) accept = ''
  @property({ type: Boolean }) multiple = false
  @property({ type: Boolean }) capture = false

  @query('input') private input!: HTMLInputElement

  render() {
    return html`
      <mm-add-button @click=${this.openFilePicker}>${this.label}</mm-add-button>
      <input
        type="file"
        accept=${ifDefined(this.accept || undefined)}
        ?multiple=${this.multiple}
        capture=${this.capture ? 'camera' : nothing}
        @change=${this.handleChange}
      />
    `
  }

  private openFilePicker() {
    this.input.click()
  }

  private handleChange(event: Event) {
    const input = event.target as HTMLInputElement

    emit(this, 'files-change', { files: Array.from(input.files ?? []) })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-attachment-button': AttachmentButton
  }
}
