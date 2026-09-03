import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import '@/components/common/icon-button/icon-button'
import { iconButtonActionStyles } from '@/components/common/icon-button/icon-button.styles'
import { ICON_NAMES } from '@/components/common/icon-button/semantics/icon-names'

@customElement('mm-to-top-button')
export class ToTopButton extends LitElement {
  static styles = [iconButtonActionStyles]

  render() {
    return html`
      <mm-icon-button
        variant="secondary"
        icon=${ICON_NAMES.SCROLL_TOP}
        aria-label="맨 위로"
        @click=${this.handleClick}
      ></mm-icon-button>
    `
  }

  private handleClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-to-top-button': ToTopButton
  }
}
