import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'
import { resetStyles } from '@/stylesheets/shared/reset.styles'

@customElement('mm-to-top-button')
export class ToTopButton extends LitElement {
  static styles = [resetStyles]

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
