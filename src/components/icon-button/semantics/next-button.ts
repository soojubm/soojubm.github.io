import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ICON_NAMES } from './icon-names'
import '../icon-button'

@customElement('mm-next-button')
export class NextButton extends LitElement {
  @property({ type: Boolean, reflect: true }) disabled = false

  static styles = css`
    :host {
      display: inline-flex;
    }
  `

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('click', this._handleClick)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener('click', this._handleClick)
  }

  private _handleClick = () => {
    if (this.disabled) return
    this.dispatchEvent(new CustomEvent('next', { bubbles: true, composed: true }))
  }

  render() {
    return html`
      <mm-icon-button
        icon=${ICON_NAMES.NEXT}
        variant="secondary"
        aria-label="다음"
        ?disabled=${this.disabled}
      ></mm-icon-button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-next-button': NextButton
  }
}
