import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { resetStyles } from '../shared/reset.styles'

@customElement('mm-to-top-button')
export class ToTopButton extends LitElement {
  static styles = [resetStyles]

  private handleClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  render() {
    return html`
      <mm-icon-button
        variant="navigator"
        icon="arrow-up"
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
