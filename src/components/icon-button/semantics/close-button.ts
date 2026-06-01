import { customElement } from 'lit/decorators.js'
import IconButton from '../icon-button'
import { ICON_NAMES } from './icon-names'

/**
 * 모달, 패널, 시트 등 레이어를 닫는 버튼.
 * navigator variant — 원형, 테두리, 그림자
 */
@customElement('mm-close-button')
export class CloseButton extends IconButton {
  constructor() {
    super()
    this.icon = ICON_NAMES.XMARK
    this.variant = 'navigator'
    this.ariaLabel = '닫기'
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
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }))
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-close-button': CloseButton
  }
}
