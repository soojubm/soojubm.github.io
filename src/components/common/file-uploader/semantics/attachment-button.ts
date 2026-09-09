import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import { visuallyHidden } from '@/stylesheets/shared.styles'
import { emit } from '@/utils'
import '@/components/common/button/semantics/add-button'

@customElement('mm-attachment-button')
export class AttachmentButton extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    input {
      ${visuallyHidden};
    }
  `

  @property({ type: String }) label = ''
  @property({ type: String }) accept = ''
  @property({ type: Boolean }) multiple = false
  @property({ type: Boolean }) capture = false

  @query('input') private input!: HTMLInputElement

  render() {
    return html`
      <mm-add-button @click=${this.handleAddButtonClick}>${this.label}</mm-add-button>
      <input
        type="file"
        accept=${ifDefined(this.accept || undefined)}
        ?multiple=${this.multiple}
        capture=${this.capture ? 'camera' : nothing}
        @change=${this.handleFilesChange}
      />
    `
  }

  private handleAddButtonClick() {
    this.input.click()
  }

  private handleFilesChange(event: Event) {
    const input = event.target as HTMLInputElement

    emit(this, 'change', { files: Array.from(input.files ?? []) })
  }
}
