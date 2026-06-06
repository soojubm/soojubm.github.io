import { customElement } from 'lit/decorators.js'
import IconButton from '../icon-button'
import { ICON_NAMES } from './icon-names'

@customElement('mm-prev-button')
export class PrevButton extends IconButton {
  constructor() {
    super()
    this.icon = ICON_NAMES.PREVIOUS
    this.variant = 'navigator'
    this.ariaLabel = '이전'
  }

  override connectedCallback() {
    super.connectedCallback()
    this.addEventListener('click', this._handleClick)
  }

  override disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener('click', this._handleClick)
  }

  private _handleClick = () => {
    if (this.disabled) return
    this.dispatchEvent(new CustomEvent('prev', { bubbles: true, composed: true }))
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-prev-button': PrevButton
  }
}
