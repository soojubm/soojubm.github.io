import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ICON_NAMES } from '../../icon-button/semantics/icon-names'
import { buttonStyles } from '../button.styles'

@customElement('mm-clear-button')
class ClearButton extends LitElement {
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = ''
  @property({ type: Boolean, reflect: true }) disabled = false

  static styles = [
    buttonStyles,
    css`
      :host {
        display: inline-flex;
      }
      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: var(--size-tiny);
        height: var(--size-tiny);
        border-radius: var(--radius-round);
        border: none;
        background: transparent;
        cursor: pointer;
        padding: 0;
        color: inherit;
      }
      button:disabled {
        opacity: 0.4;
        cursor: default;
      }
    `,
  ]

  render() {
    return html`
      <button aria-label="${this.ariaLabel}" ?disabled="${this.disabled}">
        <mm-icon name=${ICON_NAMES.CLOSE}></mm-icon>
      </button>
    `
  }
}

export default ClearButton
