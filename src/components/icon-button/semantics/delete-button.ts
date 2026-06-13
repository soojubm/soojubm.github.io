import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ICON_NAMES } from './icon-names'
import '../icon-button'

/**
 * 아이템·데이터를 영구 삭제하는 파괴적 액션 버튼.
 */
@customElement('mm-delete-button')
export class DeleteButton extends LitElement {
  @property({ type: String, attribute: 'confirm-message' })
  confirmMessage = '정말 삭제하시겠어요?'

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
    if (!window.confirm(this.confirmMessage)) return
    this.dispatchEvent(new CustomEvent('delete', { bubbles: true, composed: true }))
  }

  render() {
    return html`
      <mm-icon-button
        icon=${ICON_NAMES.DELETE}
        variant="destructive"
        aria-label="삭제"
        ?disabled=${this.disabled}
      ></mm-icon-button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-delete-button': DeleteButton
  }
}
