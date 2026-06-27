import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'
import '@/components/icon-button/icon-button'
import { emit } from '@/utils/emit'

/**
 * 모달, 패널, 시트 등 레이어를 닫는 버튼.
 */
@customElement('mm-close-button')
export class CloseButton extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
    }
  `

  @property({ type: Boolean }) disabled = false

  private _handleClick = () => {
    emit(this, 'close')
  }

  render() {
    return html`
      <mm-icon-button
        icon=${ICON_NAMES.CLOSE}
        variant="secondary"
        aria-label="닫기"
        ?disabled=${this.disabled}
        @click=${this._handleClick}
      ></mm-icon-button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-close-button': CloseButton
  }
}
