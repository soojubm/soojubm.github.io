import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { iconButtonStyles } from '../icon-button.styles'
import { ICON_NAMES } from './icon-names'

/**
 * 모달, 패널, 시트 등 레이어를 닫는 버튼.
 * navigator variant — 원형, 테두리, 그림자
 */
@customElement('mm-close-button')
export class CloseButton extends LitElement {
  @property({ type: String, attribute: 'aria-label' })
  override ariaLabel = '닫기'

  static styles = [iconButtonStyles]

  private handleClick() {
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }))
  }

  render() {
    return html`
      <button
        type="button"
        class="icon-button"
        data-variant="navigator"
        aria-label=${this.ariaLabel}
        @click=${this.handleClick}
      >
        <mm-icon name=${ICON_NAMES.XMARK}></mm-icon>
      </button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-close-button': CloseButton
  }
}
