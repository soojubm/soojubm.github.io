import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'
import '@/components/icon-button/icon-button'
import { emit } from '@/utils/emit'

/**
 * 배너, 알림, 토스트 등 비파괴적 해제 버튼.
 */
@customElement('mm-dismiss-button')
export class DismissButton extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
    }
  `

  @property({ type: Boolean }) disabled = false

  private handleClick = () => {
    if (this.disabled) return
    emit(this, 'dismiss')
  }

  render() {
    return html`
      <mm-icon-button
        variant="secondary"
        size="small"
        icon=${ICON_NAMES.DISMISS}
        aria-label="닫기"
        ?disabled=${this.disabled}
        @click=${this.handleClick}
      ></mm-icon-button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-dismiss-button': DismissButton
  }
}
