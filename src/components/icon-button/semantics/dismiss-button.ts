import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ICON_NAMES } from './icon-names'
import '../icon-button'

/**
 * 배너, 알림, 토스트 등 비파괴적 해제 버튼.
 */
@customElement('mm-dismiss-button')
export class DismissButton extends LitElement {
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
    this.dispatchEvent(new CustomEvent('dismiss', { bubbles: true, composed: true }))
  }

  render() {
    return html`
      <mm-icon-button
        variant="secondary"
        size="small"
        icon=${ICON_NAMES.DISMISS}
        aria-label="닫기"
        ?disabled=${this.disabled}
      ></mm-icon-button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-dismiss-button': DismissButton
  }
}
