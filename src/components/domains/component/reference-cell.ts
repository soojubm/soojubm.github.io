import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common/icon/icon'
import { ICON_NAMES } from '@/components/common/icon/icon-names'
import { referenceCellStyles } from '@/components/domains/component/reference-cell.styles'
import { resetStyles } from '@/stylesheets/shared.styles'

@customElement('fff-reference-cell')
export class ReferenceCell extends LitElement {
  static styles = [
    resetStyles,
    referenceCellStyles,
    css`
      .text {
        display: flex;
        flex-direction: column;
      }
    `,
  ]
  @property({ type: String }) href = ''
  @property({ type: String }) brand = ''
  @property({ type: String }) page = ''

  render() {
    return html`
      <a href=${this.href} target="_blank" rel="noopener noreferrer">
        <span class="text">
          <span>${this.brand}</span>
          ${this.page
            ? html`
                <span>${this.page}</span>
              `
            : nothing}
        </span>
        <fff-icon name=${ICON_NAMES.EXTERNAL_LINK} aria-hidden="true"></fff-icon>
      </a>
    `
  }
}
