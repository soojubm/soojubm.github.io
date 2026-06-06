import { customElement } from 'lit/decorators.js'
import IconButton from '../icon-button'
import { ICON_NAMES } from './icon-names'

@customElement('mm-next-button')
export class NextButton extends IconButton {
  constructor() {
    super()
    this.icon = ICON_NAMES.NEXT
    this.variant = 'navigator'
    this.ariaLabel = '다음'
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
    this.dispatchEvent(new CustomEvent('next', { bubbles: true, composed: true }))
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-next-button': NextButton
  }
}
