import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ICON_NAMES } from './icon-names'
import '../icon-button'

@customElement('mm-prev-button')
export class PrevButton extends LitElement {
  @property({ type: Boolean, reflect: true }) disabled = false

  static styles = css`
    :host {
      display: contents;
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
    this.dispatchEvent(new CustomEvent('prev', { bubbles: true, composed: true }))
  }

  render() {
    return html`
      <mm-icon-button
        icon=${ICON_NAMES.PREVIOUS}
        variant="secondary"
        aria-label="이전"
        ?disabled=${this.disabled}
      ></mm-icon-button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-prev-button': PrevButton
  }
}
