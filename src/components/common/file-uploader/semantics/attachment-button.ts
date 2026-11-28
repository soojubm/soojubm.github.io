import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import { ICON_NAMES } from '@/components/common/icon/icon-names'
import { visuallyHiddenStyles, resetStyles } from '@/stylesheets/shared.styles'
import { emit } from '@/utils'
import '@/components/common/menu-item/semantics/menu-item-action'

@customElement('fff-attachment-button')
export class AttachmentButton extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
      }

      input {
        ${visuallyHiddenStyles};
      }
    `,
  ]
  @property({ type: String }) label = ''
  @property({ type: String }) accept = ''
  @property({ type: Boolean }) multiple = false
  @property({ type: Boolean }) capture = false
  @query('input') private input!: HTMLInputElement

  render() {
    return html`
      <fff-menu-item-action
        icon=${ICON_NAMES.ADD_CIRCLE}
        label=${this.label}
        @click=${this.handleActionClick}
      ></fff-menu-item-action>
      <input
        type="file"
        accept=${ifDefined(this.accept || undefined)}
        ?multiple=${this.multiple}
        capture=${this.capture ? 'camera' : nothing}
        @change=${this.handleFilesChange}
      />
    `
  }

  private handleActionClick() {
    this.input.click()
  }

  private handleFilesChange(event: Event) {
    const input = event.target as HTMLInputElement

    emit(this, 'change', { files: Array.from(input.files ?? []) })
  }
}
