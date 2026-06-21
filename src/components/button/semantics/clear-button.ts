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

    mm-icon-button {
      --icon-button-size: var(--size-tiny);
      --icon-button-radius: var(--radius-round);
      --icon-button-color: var(--color-background);
    }
  `

  render() {
    return html`
      <mm-icon-button
        icon=${ICON_NAMES.CLOSE}
        variant="tertiary"
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
