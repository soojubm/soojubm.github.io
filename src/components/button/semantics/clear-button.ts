import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ICON_NAMES } from '../../icon-button/semantics/icon-names'
import { buttonStyles } from '../button.styles'

@customElement('mm-clear-button')
class ClearButton extends LitElement {
  @property({ type: String }) label = ''
  @property({ type: Boolean, reflect: true }) disabled = false

  static styles = [buttonStyles]

  render() {
    return html`
      <button
        class="icon-button"
        data-variant="clear"
        aria-label="${this.label}"
        ?disabled="${this.disabled}"
      >
        <mm-icon name=${ICON_NAMES.CLOSE}></mm-icon>
      </button>
    `
  }
}

export default ClearButton
