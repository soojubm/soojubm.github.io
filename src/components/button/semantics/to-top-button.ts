import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'
import { ICON_NAMES } from '../../icon-button/semantics/icon-names'

@customElement('mm-to-top-button')
export class ToTopButton extends LitElement {
  static styles = [resetStyles]

  private handleClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-to-top-button': ToTopButton
  }
}
