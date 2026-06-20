import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ICON_NAMES } from '../../icon-button/semantics/icon-names'
import '../../icon-button/icon-button'

@customElement('mm-clear-button')
class ClearButton extends LitElement {
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = ''
  @property({ type: Boolean, reflect: true }) disabled = false

  static styles = css`
    :host {
      display: contents;
    }
  `

  render() {
    return html`
      <mm-icon-button
        icon=${ICON_NAMES.CLOSE}
        variant="clear"
        aria-label=${this.ariaLabel}
        ?disabled=${this.disabled}
      ></mm-icon-button>
    `
  }
}

export default ClearButton

declare global {
  interface HTMLElementTagNameMap {
    'mm-clear-button': ClearButton
  }
}
