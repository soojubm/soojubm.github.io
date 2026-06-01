import { css } from 'lit'
import { customElement } from 'lit/decorators.js'
import IconButton from '../icon-button'
import { ICON_NAMES } from './icon-names'

/**
 * 배너, 알림, 토스트 등 비파괴적 해제 버튼.
 * plain variant — 배경 없음, 경량
 */
@customElement('mm-dismiss-button')
export class DismissButton extends IconButton {
  static override styles = [
    ...IconButton.styles,
    css`
      .icon-button[data-variant='plain'] {
        color: var(--color-foreground-light);
      }
      .icon-button[data-variant='plain']:hover {
        color: var(--color-foreground);
        background-color: var(--color-background-subtle);
      }
    `,
  ]

  constructor() {
    super()
    this.icon = ICON_NAMES.XMARK
    this.variant = 'plain'
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
    this.dispatchEvent(new CustomEvent('dismiss', { bubbles: true, composed: true }))
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-dismiss-button': DismissButton
  }
}
